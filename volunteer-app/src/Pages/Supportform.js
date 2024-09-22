import "./Supportform.css"

const SupportForm = () => {
    return ( 
        <main className="support">
            <h1>Something's Off? Let us know here!</h1>
            <form>
                <label for="email">Email ID</label>
                <input type="email" id="email" name="email" required />
                
                <label for="timestamp">Timestamp</label>
                <input type="text" id="timestamp" name="timestamp" value="" readonly />
                
                <label for="category">Issue Category</label>
                <input type="text" id="category" name="category" required />
                
                <label for="description">Describe the issue</label>
                <textarea id="description" name="description" required></textarea>
                
                <button type="submit">Submit</button>
            </form>
        </main>
     );
}
 
export default SupportForm;