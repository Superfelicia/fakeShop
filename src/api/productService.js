
export const fetchCollections = async () => {
    try {
        const request = await fetch('https://mock.shop/api?query={collections(first:%2010){edges%20{cursor%20node%20{id%20handle%20title%20description%20image%20{id%20url}}}}}')
        const response = await request.json();
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching collections:", error);
    }
};

export const fetchCollectionProducts = async (collectionId) => {
    try {
        const encodedCollectionId = encodeURIComponent(collectionId);
        const request = await fetch(`https://mock.shop/api?query={collection(id:%20%22${encodedCollectionId}%22){products(first:%2020){edges%20{node%20{id%20title%20featuredImage%20{id%20url}}}}}}`);
        const response = await request.json();

        const products = response.data.collection.products.edges;
        console.log(products);
        return products;
    } catch (error) {
        console.error("Error fetching collections:", error);
    }
};

