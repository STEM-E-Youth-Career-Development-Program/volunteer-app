import "./userMenu.css"
function UserMenu() {
    return (
        <div class="dropdown">
            <button class="dropbtn">User</button>
            <div class="dropdown-content">
                <div class="dropdown-row">
                    <span class="material-symbols-outlined">home</span>
                    <a href="#">Account</a>
                </div>
                <div class="dropdown-row">
                    <span class="material-symbols-outlined">support_agent</span>
                    <a href="/supportform">Support</a>
                </div>
                <div class="dropdown-row">
                    <span class="material-symbols-outlined">live_help</span>
                    <a href="#">FAQ</a>
                </div>
                <div class="dropdown-row">
                    <span class="material-symbols-outlined">contact_mail</span>
                    <a href="#">Contact us</a>
                </div>
                <div class="dropdown-row">
                    <span class="material-symbols-outlined">logout</span>
                    <a href="/">Logout</a>
                </div>
            </div>
        </div>
    );
}

export default UserMenu;
