
export const fetchRecords = async () => {
    const response = await fetch('mock_data.json');

    try {
        return await response.json()
    } catch (error) { return console.warn(error) }


}