// ==========================================
// 1. DATA: Our list of users (Agents)
// ==========================================
const agents = [
    { name: "Ruona Imisi", email: "ruona@gmail.ng", status: "active", balance: 200000000 },
    { name: "Ohi", email: "hilda@gmail.com", status: "active", balance: 50000 },
    { name: "Crosley Bassey", email: "cros@gmail.com", status: "frozen", balance: 100000 },
    { name: "Sylvia", email: "sylvia@gmail.com", status: "active", balance: 1000 },
    { name: "Bright", email: "bright@gmail.com", status: "active", balance: 300000 },
    { name: "Opeyemi", email: "opeyemi@gmail.com", status: "frozen", balance: 24000 },
    { name: "Tobi", email: "Tobi@gmail.com", status: "frozen", balance: 10000 }
];

// ==========================================
// 2. MEMORY: Storing temporary settings
// ==========================================
let isBalanceHidden = false; // Remembers if we should hide the money

// ==========================================
// 3. TOOLS: Functions that do specific jobs
// ==========================================

/** 
 * formatCurrency: Turns a number like 1000 into "₦1,000"
 */
function formatCurrency(amount) {
    return "₦" + amount.toLocaleString();
}

/** 
 * updateMasterCard: Calculates total money and updates the green card 
 */
function updateMasterCard() {
    const balanceText = document.getElementById("master-balance");
    
    // Calculate total balance
    let total = 0;
    agents.forEach(agent => total += agent.balance);

    // Show money or stars based on our "Memory"
    if (isBalanceHidden) {
        balanceText.textContent = "₦********";
    } else {
        balanceText.textContent = formatCurrency(total);
    }
}

/** 
 * updateStats: Updates the 3 small boxes at the top 
 */
function updateStats() {
    const totalCount = agents.length;
    const activeCount = agents.filter(a => a.status === "active").length;
    const frozenCount = agents.filter(a => a.status === "frozen").length;

    document.getElementById("total-agents-count").textContent = totalCount;
    document.getElementById("active-agents-count").textContent = activeCount;
    document.getElementById("frozen-agents-count").textContent = frozenCount;
}

/** 
 * renderTable: Draws the list of users in the HTML table 
 */
function renderTable(listToDraw) {
    const tableBody = document.getElementById("users-body");
    tableBody.innerHTML = ''; // Clear the table first

    // If no one matches the search
    if (listToDraw.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--text-muted);">No users found.</td></tr>`;
        return;
    }

    // Draw each user as a row
    listToDraw.forEach((agent, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${agent.name}</td>
            <td>${agent.email}</td>
            <td>
                <span class="status status-${agent.status.toLowerCase()}">${agent.status}</span>
            </td>
            <td>${formatCurrency(agent.balance)}</td>
            <td>
                <button class="btn-action" onclick="toggleUserStatus(${index})">
                    ${agent.status === 'frozen' ? 'Unfreeze' : 'Freeze'}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/** 
 * toggleUserStatus: Runs when you click "Freeze" or "Unfreeze"
 */
function toggleUserStatus(index) {
    const agent = agents[index];
    
    // Swap status
    if (agent.status === "active") {
        agent.status = "frozen";
    } else {
        agent.status = "active";
    }

    // Refresh everything to show changes
    renderTable(agents);
    updateStats();
}

// ==========================================
// 4. MAIN: Code that runs when the page starts
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial setup
    renderTable(agents);
    updateStats();
    updateMasterCard();

    // 2. Search Box Logic
    const searchInput = document.getElementById("user-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = agents.filter(a => 
                a.name.toLowerCase().includes(term) || 
                a.email.toLowerCase().includes(term)
            );
            renderTable(filtered);
        });
    }

    // 3. Balance Toggle (Eye Icon)
    const eyeIcon = document.getElementById("balance-toggle");
    if (eyeIcon) {
        eyeIcon.addEventListener("click", () => {
            isBalanceHidden = !isBalanceHidden; // Flip the memory
            
            // Change the icon look
            if (isBalanceHidden) {
                eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
            } else {
                eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
            }
            
            updateMasterCard(); // Refresh the card
        });
    }

    // 4. Mobile Menu Toggle
    const menuBtn = document.getElementById("menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (menuBtn && sidebar && overlay) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        });

        overlay.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    }
});