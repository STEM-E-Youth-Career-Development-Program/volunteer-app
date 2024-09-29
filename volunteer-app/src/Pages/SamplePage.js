import "./SamplePage.css"

const SamplePage = () => {
    return ( 
        <div className="sample">
            <div className="container">
            <div className="sidebar">
                <h3>General</h3>
                <ul>
                    <li>About STEM-E</li>
                    <li>Mission and Vision</li>
                    <li>Values</li>
                    <li>PVSA</li>
                    <li>Internship Benefits</li>
                    <li>Internship Roles</li>
                    <li>Internship Requirements</li>
                    <li>Team Meetings</li>
                    <li>Switching Roles</li>
                    <li>WhenIsGood?</li>
                    <li>Letters and Certificates</li>
                    <li>Logging Hours</li>
                </ul>
            </div>
            <div class="main-content">

                <h2>Category</h2>
                <h1>Title</h1>
                <img src="bigimage.jpg" alt="Smartphones" />
                
                <h3>Header 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>

                <a href="#" class="button">Read full article</a>

                <h3>Header 2</h3>
                <img src="shortimage.jpg" alt="Pink Smartphone"/>
                {/* style={{"height: 100px"}} */}
                <h4>Important statement</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
                
                <a href="#" class="button">Check out our blog</a>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
            </div>
        </div>
    </div>
     );
}
 
export default SamplePage;