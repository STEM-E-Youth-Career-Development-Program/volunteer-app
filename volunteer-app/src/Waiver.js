export const retrieveWaiver = async () => {
    try {
        const response = await fetch("http://localhost:5001/api/read-from-sheet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        })

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Unknown error occurred");
        }

        return data.message;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
};
export default retrieveWaiver;