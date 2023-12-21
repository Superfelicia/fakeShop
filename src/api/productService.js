
export const fetchCollections = async () => {
    try {
        const request = await fetch('https://mock.shop/api?query={collections(first:%2010){edges%20{cursor%20node%20{id%20handle%20title%20description%20image%20{id%20url}}}}}')
        const response = await request.json();
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching collections:", error);
    }
};

export const fetchCollectionProducts = async (collectionId) => {
    try {
        const request = await fetch(`https://mock.shop/api?query={collection(id:%20%22${encodeURIComponent(collectionId)}%22){id%20title%20products(first:%2020){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{priceV2%20{amount%20currencyCode}}}}}}}}}`);
        const response = await request.json();

        const products = response.data.collection.products.edges;
        console.log(products);
        return products;
    } catch (error) {
        console.error("Error fetching collections:", error);
    }
};

export const fetchProductDetails = async (productId) => {
    try {
        const request = await fetch(`https://mock.shop/api?query={product(id:%20%22${encodeURIComponent(productId)}%22){id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{cursor%20node%20{id%20title%20image%20{url}%20price%20{amount%20currencyCode}}}}}}`);
        const response = await request.json();

        const productDetails = response.data.product;
        console.log(productDetails);
        return productDetails;
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}

export const createCart = async (variantId) => {
    try {
        const body = {
            query: `
        mutation CartCreate {
          cartCreate(
            input: {
              lines: [
                {
                  quantity: 1
                  merchandiseId: "${variantId}"
                }
              ]
            }
          ) {
            cart {
              id
              createdAt
              updatedAt
              lines(first: 10) {
                edges {
                  node {
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        image {
                          id
                          url
                        }
                      }
                    }
                  }
                }
              }
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
        };

        const request = await fetch('https://mock.shop/api', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            },
        });

        const response = await request.json();
        return response.data.cartCreate.cart; // Return the created cart
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

export const fetchCart = async (cartId) => {
    try {
        const query = `
            query GetCart($cartId: ID!) {
                cart(id: $cartId) {
                    id
                    createdAt
                    updatedAt
                    lines(first: 10) {
                        edges {
                            node {
                                id
                                merchandise {
                                    ... on ProductVariant {
                                        id
                                        title
                                        image {
                                            id
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                        subtotalAmount {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        `;

        const variables = {
            cartId: cartId,
        };

        const url = 'https://mock.shop/api';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables,
            }),
        });

        console.log(url);

        const data = await response.json();

        if (data.errors) {
            console.log('GraphQL errors:', data.errors);
        }

        if (data && data.data && data.data.cart) {
            return data.data.cart;
        } else {
            console.error("Cart not found in data:", data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};