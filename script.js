/* =========================================================
   CRESTMONT DIGITAL ASSETS
   MAIN WEBSITE JAVASCRIPT
   ========================================================= */

// ============================================
// SUPABASE CONNECTION
// ============================================

const SUPABASE_URL = "https://cseifieuxbtzkdagmmra.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZWlmaWV1eGJ0emtkYWdtbXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2MTE2MTksImV4cCI6MjEwNTE4NzYxOX0.zYgIoLgo1d4osbLrBctuwGnYxKtKqoxxDepQw0B4Dio";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE HOMEPAGE MENU
       ===================================================== */

    const menuButton = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuButton && mainNav) {

        menuButton.addEventListener("click", function () {

            mainNav.classList.toggle("mobile-nav-open");

            const isOpen =
                mainNav.classList.contains("mobile-nav-open");

            menuButton.textContent = isOpen ? "✕" : "☰";

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        mainNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("mobile-nav-open");

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }


    /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", function () {

            const alreadyOpen =
                item.classList.contains("active");

            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            });

            if (!alreadyOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";
            }

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(".site-header");

    if (header) {

        function updateHeader() {

            if (window.scrollY > 20) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }

        }

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();
    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .how-card, .plan-card, .market-row, .faq-item, .support-card"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-element"
                            );

                            requestAnimationFrame(function () {

                                entry.target.classList.add(
                                    "revealed"
                                );

                            });

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );

        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       HOMEPAGE MARKET TABLE
       ===================================================== */

    const marketAssets = [
        "BTC",
        "ETH",
        "USDT",
        "BNB",
        "XRP",
        "SOL"
    ];

    function setMarketLoadingState() {

        marketAssets.forEach(function (symbol) {

            const priceElement =
                document.querySelector(
                    '[data-symbol="' + symbol + '"]'
                );

            const changeElement =
                document.querySelector(
                    '[data-change="' + symbol + '"]'
                );

            if (priceElement) {
                priceElement.textContent =
                    "Live data pending";
            }

            if (changeElement) {
                changeElement.textContent = "—";
            }

        });

    }

    setMarketLoadingState();


    /* =====================================================
       MARKET ROW HOVER
       ===================================================== */

    document.querySelectorAll(".market-row")
        .forEach(function (row) {

            row.addEventListener(
                "mouseenter",
                function () {
                    row.classList.add(
                        "market-row-active"
                    );
                }
            );

            row.addEventListener(
                "mouseleave",
                function () {
                    row.classList.remove(
                        "market-row-active"
                    );
                }
            );

        });


// ============================================
// REGISTRATION
// ============================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const firstName = document
            .getElementById("firstName")
            .value.trim();

        const middleName = document
            .getElementById("middleName")
            ?.value.trim() || "";

        const lastName = document
            .getElementById("lastName")
            .value.trim();

        const email = document
            .getElementById("email")
            .value.trim();

        const phone = document
            .getElementById("phone")
            .value.trim();

        const country = document
            .getElementById("country")
            .value.trim();

        const dateOfBirth = document
            .getElementById("dateOfBirth")
            .value;

        const password = document
            .getElementById("password")
            .value;

        const confirmPassword = document
            .getElementById("confirmPassword")
            .value;

        const referralCode = document
            .getElementById("referralCode")
            ?.value.trim() || "";

        const message = document.getElementById("registerMessage");

        if (!message) {
            return;
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        // Basic password length check
        if (password.length < 8) {
            message.textContent =
                "Password must be at least 8 characters.";
            return;
        }

        // Make sure Supabase is connected
        if (!supabaseClient) {
            message.textContent =
                "Connection error. Please try again.";
            return;
        }

        message.textContent = "Creating your account...";

        try {
            const { data, error } =
                await supabaseClient.auth.signUp({
                    email: email,
                    password: password,

                    options: {
                        data: {
                            first_name: firstName,
                            middle_name: middleName,
                            last_name: lastName,
                            phone: phone,
                            country: country,
                            date_of_birth: dateOfBirth,
                            referral_code: referralCode
                        }
                    }
                });

            if (error) {
                message.textContent = error.message;
                return;
            }

            if (data.session) {
                message.textContent =
                    "Account created successfully.";

                window.location.href = "dashboard.html";
            } else {
                message.textContent =
                    "Account created. Please check your email to confirm your account.";
            }

        } catch (error) {
            console.error("Registration error:", error);

            message.textContent =
                "Something went wrong. Please try again.";
        }
    });
}


 // ============================================
// SIGN IN
// ============================================

const signinForm = document.getElementById("signinForm");

const rememberedEmail =
    localStorage.getItem("crestmontRememberEmail");

const signinEmailInput =
    document.getElementById("email");

const rememberLogin =
    document.getElementById("rememberLogin");

if (rememberedEmail && signinEmailInput) {
    signinEmailInput.value = rememberedEmail;

    if (rememberLogin) {
        rememberLogin.checked = true;
    }
}

if (signinForm) {
    signinForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const message = document.getElementById("signinMessage");

        if (!emailInput || !passwordInput || !message) {
            return;
        }

        const email = emailInput.value.trim();
const password = passwordInput.value;

const rememberLogin =
    document.getElementById("rememberLogin");

if (rememberLogin?.checked) {
    localStorage.setItem("crestmontRememberEmail", email);
} else {
    localStorage.removeItem("crestmontRememberEmail");
}

        if (!email || !password) {
            message.textContent =
                "Please enter your email and password.";
            return;
        }

        if (!supabaseClient) {
            message.textContent =
                "Connection error. Please try again.";
            return;
        }

        message.textContent = "Signing you in...";

        try {
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) {
                message.textContent =
                    "Unable to sign in. Please check your email and password.";
                console.error("Sign in error:", error);
                return;
            }

            if (data.session) {
                message.textContent = "Sign in successful.";

                window.location.href = "dashboard.html";
            }

        } catch (error) {
            console.error("Sign in error:", error);

            message.textContent =
                "Something went wrong. Please try again.";
        }
    });
}


    /* =====================================================
       FORGOT PASSWORD
       ===================================================== */

    const forgotPassword =
    document.getElementById("forgotPassword");

if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();

            const emailInput =
                document.getElementById("email");

            const message =
                document.getElementById("signinMessage");

            if (!emailInput || !message) {
                return;
            }

            const email =
                emailInput.value.trim();

            if (!email) {

                showAuthMessage(
                    message,
                    "Please enter your email address first.",
                    "error"
                );

                return;
            }

            const { error } =
                await supabaseClient.auth.resetPasswordForEmail(
                    email,
                    {
                        redirectTo:
                            window.location.origin +
                            "/reset-password.html"
                    }
                );

            if (error) {

                console.error(
                    "Password reset error:",
                    error
                );

                showAuthMessage(
                    message,
                    error.message,
                    "error"
                );

                return;
            }

            showAuthMessage(
                message,
                "Password reset instructions have been sent to your email.",
                "success"
            );

        }
    );

}


    /* =====================================================
       DASHBOARD
       ===================================================== */

    const dashboardPage =
        document.querySelector(
            ".dashboard-page"
        );

    if (dashboardPage) {

        initializeDashboard();

    }


    /* =====================================================
       FOOTER YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       PREVENT EMPTY # LINKS FROM JUMPING
       ===================================================== */

    document.querySelectorAll(
        'a[href="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

            }
        );

    });


    console.log(
        "Crestmont Digital Assets website loaded."
    );

});


/* =========================================================
   AUTH MESSAGE HELPER
   ========================================================= */

function showAuthMessage(
    element,
    text,
    type
) {

    element.textContent = text;

    element.className =
        "auth-message show " + type;

}


/* =========================================================
   DASHBOARD INITIALIZATION
   ========================================================= */

function initializeDashboard() {

    /* =====================================================
       SIDEBAR MOBILE MENU
       ===================================================== */

    const menuButton =
        document.getElementById(
            "dashboardMenuBtn"
        );

    const sidebar =
        document.getElementById(
            "dashboardSidebar"
        );

    if (menuButton && sidebar) {

        menuButton.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }


    /* =====================================================
       CLOSE SIDEBAR AFTER NAVIGATION
       ===================================================== */

    document.querySelectorAll(
        ".dashboard-nav-link"
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (sidebar) {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                }

            }
        );

    });


    /* =====================================================
       NOTIFICATIONS
       ===================================================== */

    const notificationButton =
        document.getElementById(
            "notificationBtn"
        );

    const notificationPanel =
        document.getElementById(
            "notificationPanel"
        );

    const closeNotifications =
        document.getElementById(
            "closeNotifications"
        );

    if (
        notificationButton &&
        notificationPanel
    ) {

        notificationButton.addEventListener(
            "click",
            function () {

                notificationPanel.classList.toggle(
                    "open"
                );

                notificationPanel.setAttribute(
                    "aria-hidden",
                    notificationPanel.classList.contains(
                        "open"
                    )
                        ? "false"
                        : "true"
                );

            }
        );

    }

    if (
        closeNotifications &&
        notificationPanel
    ) {

        closeNotifications.addEventListener(
            "click",
            function () {

                notificationPanel.classList.remove(
                    "open"
                );

                notificationPanel.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }
        );

    }

async function loadNotifications() {
    if (!supabaseClient) return;

    const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !userData.user) return;

    const notificationList =
        document.querySelector(".notification-list");

    if (!notificationList) return;

    const { data, error } =
        await supabaseClient
            .from("notifications")
            .select(
                "id, title, message, is_read, created_at"
            )
            .eq("user_id", userData.user.id)
            .order("created_at", {
                ascending: false
            });

    if (error) {
        console.error(
            "Notification loading error:",
            error
        );
        return;
    }

    notificationList.innerHTML = "";

    if (!data || data.length === 0) {
        notificationList.innerHTML = `
            <div class="notification-empty">
                <span>🔔</span>
                <strong>No new notifications</strong>
                <p>Account activity and security alerts will appear here.</p>
            </div>
        `;
        return;
    }

    data.forEach(function (notification) {
    const item =
        document.createElement("div");

    item.className =
        "notification-item" +
        (notification.is_read
            ? ""
            : " unread");

    const title =
        document.createElement("strong");

    title.textContent =
        notification.title;

    const message =
        document.createElement("p");

    message.textContent =
        notification.message;

    item.appendChild(title);
    item.appendChild(message);

    item.addEventListener("click", async function () {
        if (notification.is_read) return;

        const { data: userData, error: userError } =
            await supabaseClient.auth.getUser();

        if (userError || !userData.user) return;

        const { error } =
            await supabaseClient.rpc(
                "mark_notification_read",
                {
                    p_notification_id:
                        notification.id,
                    p_user_id:
                        userData.user.id
                }
            );

        if (error) {
            console.error(
                "Notification read error:",
                error
            );
            return;
        }

const unreadCount =
    data.filter(function (notification) {
        return !notification.is_read;
    }).length;

const notificationButton =
    document.getElementById("notificationBtn");

if (notificationButton) {
    const oldBadge =
        notificationButton.querySelector(
            ".notification-badge"
        );

    if (oldBadge) {
        oldBadge.remove();
    }

    if (unreadCount > 0) {
        const badge =
            document.createElement("span");

        badge.className =
            "notification-badge";

        badge.textContent =
            unreadCount > 99
                ? "99+"
                : unreadCount;

        badge.setAttribute(
            "aria-label",
            unreadCount +
                " unread notifications"
        );

        badge.style.cssText =
            "position:absolute;top:2px;right:2px;" +
            "min-width:18px;height:18px;" +
            "padding:0 4px;border-radius:9px;" +
            "background:#ef4444;color:white;" +
            "font-size:11px;font-weight:700;" +
            "display:flex;align-items:center;" +
            "justify-content:center;";
        
        notificationButton.style.position =
            "relative";

        notificationButton.appendChild(badge);
    }
}

        notification.is_read = true;
        item.classList.remove("unread");
    });

const badge =
    notificationButton?.querySelector(
        ".notification-badge"
    );

if (badge) {
    const currentCount =
        parseInt(badge.textContent, 10) || 0;

    if (currentCount <= 1) {
        badge.remove();
    } else {
        badge.textContent =
            currentCount - 1;
    }
}

    notificationList.appendChild(item);
});
}

    /* =====================================================
       CURRENCY SWITCHER
       ===================================================== */

    const currencySwitcher =
        document.getElementById(
            "currencySwitcher"
        );

    if (currencySwitcher) {

        currencySwitcher.addEventListener(
            "change",
            function () {

                const currency =
                    currencySwitcher.value;

                updateDashboardCurrency(
                    currency
                );

            }
        );

    }


    /* =====================================================
       WITHDRAWAL REQUEST
       ===================================================== */

    const withdrawButton =
        document.getElementById(
            "withdrawButton"
        );

    if (withdrawButton) {

        withdrawButton.addEventListener(
            "click",
            function () {

                const asset =
                    document.getElementById(
                        "withdrawAsset"
                    );

                const amount =
                    document.getElementById(
                        "withdrawAmount"
                    );

                const network =
                    document.getElementById(
                        "withdrawNetwork"
                    );

                const wallet =
                    document.getElementById(
                        "walletAddress"
                    );

                const message =
                    document.getElementById(
                        "withdrawMessage"
                    );

                if (!message) {
                    return;
                }

                if (
                    !asset.value ||
                    !amount.value ||
                    !network.value ||
                    !wallet.value.trim()
                ) {

                    showAuthMessage(
                        message,
                        "Please complete all withdrawal fields.",
                        "error"
                    );

                    return;
                }

                showAuthMessage(
                    message,
                    "Withdrawal request is ready to be submitted to the secure backend.",
                    "success"
                );

                showDashboardToast(
                    "Withdrawal request prepared."
                );

            }
        );

    }


    /* =====================================================
       DEPOSIT ACTIONS
       ===================================================== */

    document.querySelectorAll(
        ".dashboard-action-card"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const action =
                    button.getAttribute(
                        "data-action"
                    );

                if (
                    action === "crypto-deposit"
                ) {

                    showDashboardToast(
                        "Crypto deposit setup will be connected to the secure deposit system."
                    );

                }

                if (
                    action === "card-deposit"
                ) {

                    showDashboardToast(
                        "Card deposits will use a PCI-compliant payment processor."
                    );

                }

            }
        );

    });


// ============================================
// LOGOUT
// ============================================

const logoutButtons = document.querySelectorAll(
    '[data-action="logout"], .logout-button, #logoutButton, .dashboard-logout, #settingsLogoutButton'
);

logoutButtons.forEach(function (button) {
    button.addEventListener("click", async function (event) {
        event.preventDefault();

        try {
            const { error } =
                await supabaseClient.auth.signOut({
                    scope: "local"
                });

            if (error) {
                console.error("Logout error:", error);
                alert("Unable to log out. Please try again.");
                return;
            }

            window.location.href = "signin.html";

        } catch (error) {
            console.error("Logout error:", error);
            alert("Something went wrong. Please try again.");
        }
    });
});


    /* =====================================================
       PROFILE BUTTON
       ===================================================== */

    const profileButton =
        document.getElementById(
            "profileButton"
        );

    if (profileButton) {

        profileButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const profileSection =
                    document.getElementById(
                        "profile"
                    );

                if (profileSection) {

                    profileSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }

}

loadNotifications();

/* =========================================================
   DASHBOARD CURRENCY DISPLAY
   ========================================================= */

function updateDashboardCurrency(
    currency
) {

    const symbols = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        JPY: "¥"
    };

    const symbol =
        symbols[currency] || "$";

    const balance =
    document.getElementById("portfolioBalance");

const invested =
    document.getElementById("totalInvested");

const available =
    document.getElementById("availableBalance");

const withdrawal =
    document.getElementById("withdrawAvailableBalance");

}

async function loadAccountBalance() {
    if (!supabaseClient) {
        return;
    }

    const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !userData.user) {
        return;
    }

    const { data, error } =
        await supabaseClient
            .from("account_balances")
            .select(
                "portfolio_value, total_invested, available_balance"
            )
            .eq("user_id", userData.user.id)
            .maybeSingle();

    if (error) {
        console.error(
            "Balance loading error:",
            error
        );
        return;
    }

    if (!data) {
        return;
    }

    if (balance) {
        balance.textContent =
            "$" + Number(data.portfolio_value).toFixed(2);
    }

    if (invested) {
        invested.textContent =
            "$" + Number(data.total_invested).toFixed(2);
    }

    if (available) {
        available.textContent =
            "$" + Number(data.available_balance).toFixed(2);
    }

    if (withdrawal) {
        withdrawal.textContent =
            "$" + Number(data.available_balance).toFixed(2);
    }
}

async function loadPortfolioHoldings() {
    if (!supabaseClient) {
        return;
    }

    const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !userData.user) {
        return;
    }

    const { data, error } =
        await supabaseClient
            .from("portfolio_holdings")
            .select("asset_symbol, market_value")
            .eq("user_id", userData.user.id);

    if (error) {
        console.error(
            "Portfolio holdings error:",
            error
        );
        return;
    }

    const values = {
        BTC: "btcValue",
        ETH: "ethValue",
        USDT: "usdtValue",
        BNB: "bnbValue",
        XRP: "xrpValue",
        SOL: "solValue"
    };

    data.forEach(function (holding) {
        const elementId =
            values[holding.asset_symbol];

        if (!elementId) {
            return;
        }

        const element =
            document.getElementById(elementId);

        if (element) {
            element.textContent =
                "$" +
                Number(holding.market_value).toFixed(2);
        }
    });
}

loadPortfolioHoldings();
loadAccountBalance();


/* =========================================================
   DASHBOARD TOAST
   ========================================================= */

function showDashboardToast(
    message
) {

    const toast =
        document.getElementById(
            "dashboardToast"
        );

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    window.clearTimeout(
        window.crestmontToastTimer
    );

    window.crestmontToastTimer =
        window.setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            4000
        );

}


/* =========================================================
   CRESTMONT DEPOSIT PAGE
   ========================================================= */

function initializeDepositPage() {

    const cryptoPanel = document.getElementById("cryptoDepositPanel");
    const cardPanel = document.getElementById("cardDepositPanel");

    const methodButtons = document.querySelectorAll(".deposit-method-card");

    const cryptoForm = document.getElementById("cryptoDepositForm");
    const cardForm = document.getElementById("cardDepositForm");

    const cryptoAsset = document.getElementById("cryptoAsset");
    const cryptoNetwork = document.getElementById("cryptoNetwork");

    const cryptoAddress = document.getElementById("cryptoDepositAddress");
    const copyAddressButton = document.getElementById("copyDepositAddress");

    const cryptoMessage = document.getElementById("cryptoDepositMessage");
    const cardMessage = document.getElementById("cardDepositMessage");


    /* ---------------------------------------------------------
       SWITCH DEPOSIT METHOD
       --------------------------------------------------------- */

    methodButtons.forEach(button => {

        button.addEventListener("click", () => {

            const method = button.dataset.depositMethod;

            methodButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");


            if (method === "crypto") {

                cryptoPanel?.classList.remove("hidden");
                cardPanel?.classList.add("hidden");

            }


            if (method === "card") {

                cardPanel?.classList.remove("hidden");
                cryptoPanel?.classList.add("hidden");

            }

        });

    });


    /* ---------------------------------------------------------
       CRYPTO ASSET / NETWORK
       --------------------------------------------------------- */

    function updateDepositAddress() {

        if (!cryptoAddress || !cryptoAsset || !cryptoNetwork) {
            return;
        }

        const asset = cryptoAsset.value;
        const network = cryptoNetwork.value;


        if (!asset || !network) {

            cryptoAddress.textContent =
                "Select an asset and network";

            return;

        }


        /*
         * No real wallet address is displayed here.
         *
         * A production wallet address must come from a
         * secure backend / wallet provider.
         */

        cryptoAddress.textContent =
            "Deposit address will be provided securely after wallet setup.";

    }


    cryptoAsset?.addEventListener(
        "change",
        updateDepositAddress
    );

    cryptoNetwork?.addEventListener(
        "change",
        updateDepositAddress
    );


    /* ---------------------------------------------------------
       COPY ADDRESS
       --------------------------------------------------------- */

    copyAddressButton?.addEventListener("click", async () => {

        const address = cryptoAddress?.textContent?.trim();


        if (!address) {
            return;
        }


        if (
            address.includes("Select an asset") ||
            address.includes("will be provided")
        ) {

            showDashboardToast(
                "A verified deposit address is not available yet."
            );

            return;

        }


        try {

            await navigator.clipboard.writeText(address);

            showDashboardToast(
                "Deposit address copied."
            );

        } catch (error) {

            showDashboardToast(
                "Unable to copy the address."
            );

        }

    });


    /* ---------------------------------------------------------
       CRYPTO DEPOSIT FORM
       --------------------------------------------------------- */

    cryptoForm?.addEventListener("submit", async event => {

        event.preventDefault();


        const asset = cryptoAsset?.value;
        const network = cryptoNetwork?.value;
        const amount = document.getElementById(
            "cryptoAmount"
        )?.value;


        if (!asset || !network || !amount) {

            if (cryptoMessage) {

                cryptoMessage.textContent =
                    "Please complete all required fields.";

            }

            return;

        }


        if (Number(amount) <= 0) {

            if (cryptoMessage) {

                cryptoMessage.textContent =
                    "Please enter a valid deposit amount.";

            }

            return;

        }


        if (cryptoMessage) {
    cryptoMessage.textContent =
        "Submitting your crypto deposit request...";
}

try {

    const {
        data: sessionData,
        error: sessionError
    } = await supabaseClient.auth.getSession();

    if (
        sessionError ||
        !sessionData.session
    ) {
        throw new Error(
            "Please sign in again."
        );
    }

    const response = await fetch(
        SUPABASE_URL +
        "/functions/v1/deposit-processor",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",

                "Authorization":
                    "Bearer " +
                    sessionData.session.access_token
            },

            body: JSON.stringify({
                method: "crypto",
                currency: asset,
                amount: Number(amount)
            })
        }
    );

    const result =
        await response.json();

    if (!response.ok) {
        throw new Error(
            result.error ||
            "Unable to submit deposit."
        );
    }

    if (cryptoMessage) {
        cryptoMessage.textContent =
            "Your crypto deposit request has been submitted and is pending processing.";
    }

    cryptoForm.reset();

} catch (error) {

    console.error(
        "Crypto deposit submission error:",
        error
    );

    if (cryptoMessage) {
        cryptoMessage.textContent =
            error.message ||
            "Unable to submit deposit.";
    }
}
    });


    /* ---------------------------------------------------------
       CARD DEPOSIT FORM
       --------------------------------------------------------- */

    cardForm?.addEventListener("submit", event => {

        event.preventDefault();


        const cardholderName =
            document.getElementById("cardholderName")?.value.trim();

        const cardNumber =
            document.getElementById("cardNumber")?.value.trim();

        const expiryMonth =
            document.getElementById("cardExpiryMonth")?.value;

        const expiryYear =
            document.getElementById("cardExpiryYear")?.value;

        const cvv =
            document.getElementById("cardCvv")?.value.trim();

        const amount =
            document.getElementById("cardDepositAmount")?.value;


        if (
            !cardholderName ||
            !cardNumber ||
            !expiryMonth ||
            !expiryYear ||
            !cvv ||
            !amount
        ) {

            if (cardMessage) {

                cardMessage.textContent =
                    "Please complete all required card fields.";

            }

            return;

        }


        if (Number(amount) <= 0) {

            if (cardMessage) {

                cardMessage.textContent =
                    "Please enter a valid deposit amount.";

            }

            return;

        }


        if (cardMessage) {

            cardMessage.textContent =
                "Secure card processing will be connected through a PCI-compliant payment provider. No card or CVV information is stored by this page.";

        }

    });


/* Run Deposit Page */

if (document.querySelector(".deposit-panel")) {

    initializeDepositPage();

}

/* =========================================================
   CRESTMONT WITHDRAWAL PAGE
   ========================================================= */

function initializeWithdrawPage() {

    const withdrawForm =
        document.getElementById("withdrawForm");

    const withdrawMessage =
        document.getElementById("withdrawMessage");

    const withdrawAsset =
        document.getElementById("withdrawAsset");

    const withdrawNetwork =
        document.getElementById("withdrawNetwork");

    const withdrawAmount =
        document.getElementById("withdrawAmount");

    const withdrawWallet =
        document.getElementById("withdrawWallet");

    const withdrawConfirmation =
        document.getElementById("withdrawConfirmation");


    /* ---------------------------------------------------------
       WITHDRAWAL FORM
       --------------------------------------------------------- */

    withdrawForm?.addEventListener("submit", async event => {

        event.preventDefault();


        const asset =
            withdrawAsset?.value;

        const network =
            withdrawNetwork?.value;

        const wallet =
            withdrawWallet?.value.trim();

        const amount =
            withdrawAmount?.value;

        const confirmed =
            withdrawConfirmation?.checked;


        /* Required fields */

        if (
            !asset ||
            !network ||
            !wallet ||
            !amount ||
            !confirmed
        ) {

            if (withdrawMessage) {

                withdrawMessage.textContent =
                    "Please complete all required fields and confirm your withdrawal details.";

            }

            return;

        }


        /* Amount validation */

        if (Number(amount) <= 0) {

            if (withdrawMessage) {

                withdrawMessage.textContent =
                    "Please enter a valid withdrawal amount.";

            }

            return;

        }


                if (withdrawMessage) {
            withdrawMessage.textContent =
                "Submitting your withdrawal request...";
        }

        try {

            const {
                data: sessionData,
                error: sessionError
            } = await supabaseClient.auth.getSession();

            if (
                sessionError ||
                !sessionData.session
            ) {
                throw new Error(
                    "Please sign in again."
                );
            }

            const response = await fetch(
                SUPABASE_URL +
                "/functions/v1/withdrawal-processor",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " +
                            sessionData.session.access_token
                    },

                    body: JSON.stringify({
                        currency: asset,
                        amount: Number(amount),
                        wallet_address: wallet,
                        network: network
                    })
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error ||
                    "Unable to submit withdrawal."
                );
            }

            if (withdrawMessage) {
                withdrawMessage.textContent =
                    "Your withdrawal request has been submitted and is pending processing.";
            }

            withdrawForm.reset();

        } catch (error) {

            console.error(
                "Withdrawal submission error:",
                error
            );

            if (withdrawMessage) {
                withdrawMessage.textContent =
                    error.message ||
                    "Unable to submit withdrawal.";
            }
        }
    });

    /* ---------------------------------------------------------
       LOGOUT
       --------------------------------------------------------- */

    const logoutButton =
        document.getElementById("logoutButton");


    logoutButton?.addEventListener("click", () => {

        window.location.href =
            "signin.html";

    });

}


/* Run Withdrawal Page */

if (document.getElementById("withdrawForm")) {

    initializeWithdrawPage();

}

// Dashboard logout
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(
        ".dashboard-logout, #dashboardLogoutBtn"
    );

    if (logoutButton) {
        logoutButton.addEventListener("click", async function (event) {
            event.preventDefault();

            const { error } = await supabaseClient.auth.signOut();

            if (error) {
                console.error("Logout error:", error);
                return;
            }

            window.location.href = "signin.html";
        });
    }
});


// ============================================
// LIVE CRYPTO MARKET PRICES
// ============================================

async function loadMarketPrices() {

    const priceElements =
        document.querySelectorAll(
            ".coin-price[data-symbol]"
        );

    if (!priceElements.length) {
        return;
    }

    try {

        const response = await fetch(
            SUPABASE_URL +
            "/functions/v1/market-prices"
        );

        if (!response.ok) {
            throw new Error(
                "Market prices request failed"
            );
        }

        const result =
            await response.json();

        if (
            !result.success ||
            !Array.isArray(result.data)
        ) {
            throw new Error(
                "Invalid market price response"
            );
        }

        result.data.forEach(function (coin) {

            const symbol =
                coin.symbol.toUpperCase();

            const priceElement =
                document.querySelector(
                    '.coin-price[data-symbol="' +
                    symbol +
                    '"]'
                );

            const changeElement =
                document.querySelector(
                    '[data-change="' +
                    symbol +
                    '"]'
                );

            if (priceElement) {

                const price =
                    Number(coin.price);

                let formattedPrice;

                if (price < 1) {
                    formattedPrice =
                        price.toFixed(6);
                } else {
                    formattedPrice =
                        price.toLocaleString(
                            "en-US",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        );
                }

                priceElement.textContent =
                    "$" + formattedPrice;
            }

            if (changeElement) {

                const change =
                    Number(
                        coin.change_24h
                    );

                if (!Number.isFinite(change)) {
                    changeElement.textContent =
                        "—";
                    return;
                }

                const sign =
                    change >= 0 ? "+" : "";

                changeElement.textContent =
                    sign +
                    change.toFixed(2) +
                    "%";

                changeElement.classList.remove(
                    "change-positive",
                    "change-negative"
                );

                changeElement.classList.add(
                    change >= 0
                        ? "change-positive"
                        : "change-negative"
                );
            }

        });

    } catch (error) {

        console.error(
            "Live market prices error:",
            error
        );

    }
}

loadMarketPrices();

// ============================================
// PROTECT PRIVATE PAGES
// ============================================

(async function () {
    const privatePages = [
        "dashboard.html",
        "deposit.html",
        "withdraw.html",
        "transactions.html",
        "investments.html",
        "profile.html",
        "settings.html",
        "support.html",
        "admin.html"
    ];

    const currentPage =
        window.location.pathname.split("/").pop().toLowerCase();

    if (privatePages.includes(currentPage)) {
        const { data, error } =
            await supabaseClient.auth.getUser();

        if (error || !data.user) {
            window.location.href = "signin.html";
        }
    }
})();

// ============================================
// PROTECT ADMIN PAGE
// ============================================

(async function () {

    const adminPages = [
        "admin.html"
    ];

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (!adminPages.includes(currentPage)) {
        return;
    }

    const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !userData.user) {
        window.location.href = "signin.html";
        return;
    }

    const { data: profile, error: profileError } =
        await supabaseClient
            .from("profiles")
            .select("role")
            .eq("id", userData.user.id)
            .single();

    if (
        profileError ||
        !profile ||
        profile.role !== "admin"
    ) {
        window.location.href = "dashboard.html";
    }

})();

// ============================================
// LOAD ADMIN DATA
// ============================================

(async function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (currentPage !== "admin.html") {
        return;
    }

    const { data: sessionData, error: sessionError } =
        await supabaseClient.auth.getSession();

    if (sessionError || !sessionData.session) {
        return;
    }

    const session =
        sessionData.session;

    try {

        const response = await fetch(
            SUPABASE_URL +
            "/functions/v1/admin-data",
            {
                method: "GET",
                headers: {
                    "Authorization":
                        "Bearer " + session.access_token,
                    "apikey":
                        SUPABASE_ANON_KEY
                }
            }
        );

        const result =
            await response.json();

        if (!response.ok) {
            console.error(
                "Admin data error:",
                result
            );
            return;
        }

        const investments =
            result.investments || [];

        const deposits =
            result.deposits || [];

        const withdrawals =
            result.withdrawals || [];

        const pendingInvestmentsCount =
            document.getElementById(
                "pendingInvestmentsCount"
            );

        const pendingDepositsCount =
            document.getElementById(
                "pendingDepositsCount"
            );

        const pendingWithdrawalsCount =
            document.getElementById(
                "pendingWithdrawalsCount"
            );

        if (pendingInvestmentsCount) {
            pendingInvestmentsCount.textContent =
                investments.length;
        }

        if (pendingDepositsCount) {
            pendingDepositsCount.textContent =
                deposits.length;
        }

        if (pendingWithdrawalsCount) {
            pendingWithdrawalsCount.textContent =
                withdrawals.length;
        }

    } catch (error) {

        console.error(
            "Admin data loading error:",
            error
        );

    }

})();

/* =========================================================
   CRESTMONT TRANSACTIONS PAGE
   ========================================================= */

async function loadTransactions() {

    const tableBody =
        document.getElementById("transactionHistoryBody");

    const filter =
        document.getElementById("transactionFilter");

    if (!tableBody) return;

    const {
        data: userData,
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !userData.user) return;

    const selectedType =
        filter?.value || "all";

    let query =
        supabaseClient
            .from("transactions")
            .select(
                "created_at, type, currency, amount, status, reference"
            )
            .eq("user_id", userData.user.id)
            .order("created_at", {
                ascending: false
            });

    if (selectedType !== "all") {
        query = query.eq("type", selectedType);
    }

    const {
        data,
        error
    } = await query;

    if (error) {
        console.error(
            "Transaction loading error:",
            error
        );
        return;
    }

    if (!data || data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="transaction-empty">
                    No transactions yet.
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = "";

    data.forEach(function (transaction) {

        const row =
            document.createElement("tr");

        const date =
            new Date(
                transaction.created_at
            ).toLocaleDateString();

        const type =
            transaction.type
                ? transaction.type
                    .charAt(0)
                    .toUpperCase() +
                  transaction.type.slice(1)
                : "—";

        const currency =
            transaction.currency || "—";

        const amount =
            Number(transaction.amount)
                .toFixed(2);

        const status =
            transaction.status
                ? transaction.status
                    .charAt(0)
                    .toUpperCase() +
                  transaction.status.slice(1)
                : "—";

        row.innerHTML = `
            <td>${date}</td>
            <td>${type}</td>
            <td>${currency}</td>
            <td>${amount}</td>
            <td>${status}</td>
        `;

        tableBody.appendChild(row);
    });
}

if (
    document.getElementById(
        "transactionHistoryBody"
    )
) {

    loadTransactions();

    document
        .getElementById("transactionFilter")
        ?.addEventListener(
            "change",
            loadTransactions
        );
}

/* =========================================================
   CRESTMONT INVESTMENT REQUEST
   ========================================================= */

const investmentForm =
    document.getElementById("investmentForm");

const investmentPlan =
    document.getElementById("investmentPlan");

const investmentAmount =
    document.getElementById("investmentAmount");

const investmentConfirmation =
    document.getElementById("investmentConfirmation");

const investmentMessage =
    document.getElementById("investmentMessage");

investmentForm?.addEventListener("submit", async event => {

    event.preventDefault();

    const plan =
        investmentPlan?.value;

    const amount =
        Number(investmentAmount?.value);

    const confirmed =
        investmentConfirmation?.checked;

    if (!plan || !amount || !confirmed) {

        if (investmentMessage) {
            investmentMessage.textContent =
                "Please select a plan, enter an amount, and confirm the investment details.";
        }

        return;
    }

    if (amount < 10 || amount > 100000) {

        if (investmentMessage) {
            investmentMessage.textContent =
                "Investment amount must be between $10 and $100,000.";
        }

        return;
    }

    if (investmentMessage) {
        investmentMessage.textContent =
            "Submitting your investment request...";
    }

    try {

        const {
            data: sessionData,
            error: sessionError
        } = await supabaseClient.auth.getSession();

        if (
            sessionError ||
            !sessionData.session
        ) {
            throw new Error(
                "Please sign in again."
            );
        }

        const response = await fetch(
            SUPABASE_URL +
            "/functions/v1/rapid-processor",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " +
                        sessionData.session.access_token
                },

                body: JSON.stringify({
                    plan: plan,
                    amount: amount
                })
            }
        );

        const result =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.error ||
                "Unable to submit investment request."
            );
        }

        if (investmentMessage) {
            investmentMessage.textContent =
                "Your investment request has been submitted and is pending processing.";
        }

        investmentForm.reset();

    } catch (error) {

        console.error(
            "Investment submission error:",
            error
        );

        if (investmentMessage) {
            investmentMessage.textContent =
                error.message ||
                "Unable to submit investment request.";
        }
    }
});

/* =========================================================
   CRESTMONT INVESTMENT RECORDS
   ========================================================= */

async function loadInvestmentRecords() {

    const recordsContainer =
        document.getElementById("investmentRecords");

    if (!recordsContainer) return;

    const {
        data: userData,
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !userData.user) return;

    const {
        data,
        error
    } = await supabaseClient
        .from("investments")
        .select(
            "plan, amount, status, created_at"
        )
        .eq("user_id", userData.user.id)
        .order("created_at", {
            ascending: false
        });

    if (error) {
        console.error(
            "Investment loading error:",
            error
        );
        return;
    }

    if (!data || data.length === 0) {
        recordsContainer.innerHTML = `
            <span>◉</span>
            <h3>No investments yet</h3>
            <p>
                Your investment activity will appear here when available.
            </p>
        `;
        return;
    }

    recordsContainer.className =
        "investment-record-list";

    recordsContainer.innerHTML = "";

    data.forEach(function (investment) {

        const record =
            document.createElement("div");

        record.className =
            "investment-record";

        const date =
            new Date(
                investment.created_at
            ).toLocaleDateString();

        const plan =
            investment.plan || "—";

        const amount =
            Number(investment.amount)
                .toFixed(2);

        const status =
            investment.status
                ? investment.status
                    .charAt(0)
                    .toUpperCase() +
                  investment.status.slice(1)
                : "—";

        record.innerHTML = `
            <div>
                <strong>${plan}</strong>
                <span>${date}</span>
            </div>

            <div>
                <strong>$${amount}</strong>
                <span>${status}</span>
            </div>
        `;

        recordsContainer.appendChild(record);
    });
}

if (
    document.getElementById(
        "investmentRecords"
    )
) {
    loadInvestmentRecords();
}

/* =========================================================
   CRESTMONT INVESTMENT OVERVIEW
   ========================================================= */

async function loadInvestmentOverview() {

    const totalInvested =
        document.getElementById(
            "investmentTotalInvested"
        );

    const activeCount =
        document.getElementById(
            "activeInvestmentsCount"
        );

    if (!totalInvested && !activeCount) return;

    const {
        data: userData,
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !userData.user) return;

    const userId =
        userData.user.id;

    if (totalInvested) {

        const {
            data: balanceData,
            error: balanceError
        } = await supabaseClient
            .from("account_balances")
            .select("total_invested")
            .eq("user_id", userId)
            .maybeSingle();

        if (!balanceError && balanceData) {
            totalInvested.textContent =
                "$" +
                Number(
                    balanceData.total_invested
                ).toFixed(2);
        }
    }

    if (activeCount) {

        const {
            count,
            error: countError
        } = await supabaseClient
            .from("investments")
            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            )
            .eq("user_id", userId)
            .eq("status", "active");

        if (!countError) {
            activeCount.textContent =
                String(count || 0);
        }
    }
}

if (
    document.getElementById(
        "investmentTotalInvested"
    )
) {
    loadInvestmentOverview();
}

/* =========================================================
   CRESTMONT PLAN SELECTION
   ========================================================= */

const planButtons =
    document.querySelectorAll(
        "[data-plan]"
    );

planButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const selectedPlan =
                button.getAttribute(
                    "data-plan"
                );

            if (!investmentPlan) return;

            investmentPlan.value =
                selectedPlan;
        }
    );
});

// ============================================
// LOAD ADMIN USER LIST
// ============================================

(async function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (currentPage !== "admin.html") {
        return;
    }

    const userRecords =
        document.getElementById("adminUserRecords");

    if (!userRecords) {
        return;
    }

    try {

        const { data, error } =
            await supabaseClient.rpc(
                "admin_list_users"
            );

        if (error) {
            console.error(
                "Admin user list error:",
                error
            );

            userRecords.innerHTML = `
                <div class="empty-dashboard-card">
                    <strong>
                        Unable to load users
                    </strong>
                    <p>
                        Please try again later.
                    </p>
                </div>
            `;

            return;
        }

        const searchInput =
    document.getElementById("adminUserSearch");

        if (!data || data.length === 0) {

            userRecords.innerHTML = `
                <div class="empty-dashboard-card">
                    <strong>
                        No users found
                    </strong>
                    <p>
                        Registered users will appear here.
                    </p>
                </div>
            `;

            return;
        }

        const searchTerm =
    searchInput?.value.trim().toLowerCase() || "";

const filteredData =
    data.filter(function (user) {
        const fullName =
            [
                user.first_name,
                user.last_name
            ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const email =
            (user.email || "").toLowerCase();

        return (
            fullName.includes(searchTerm) ||
            email.includes(searchTerm)
        );
    });

const searchInput =
    document.getElementById("adminUserSearch");

const searchTerm =
    searchInput?.value.trim().toLowerCase() || "";

const filteredData =
    data.filter(function (user) {
        const fullName =
            [
                user.first_name,
                user.last_name
            ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const email =
            (user.email || "").toLowerCase();

        return (
            fullName.includes(searchTerm) ||
            email.includes(searchTerm)
        );
    });

userRecords.innerHTML =
    filteredData.map(function (user) {

                const fullName =
                    [
                        user.first_name,
                        user.last_name
                    ]
                    .filter(Boolean)
                    .join(" ") ||
                    "Unnamed User";

                    return `
    <div class="admin-user-card">

        <div>
            <strong>
                ${fullName}
            </strong>

            <p>
                ${user.email || ""}
            </p>

            <small>
                Role: ${user.role}
            </small>
        </div>


        <div>
            <strong>
                $${Number(
                    user.available_balance || 0
                ).toFixed(2)}
            </strong>

            <small>
                Available Balance
            </small>
        </div>


        <button
            type="button"
            class="settings-action"
            data-user-id="${user.user_id}"
            data-action="edit-balance"
        >
            Edit Balance
        </button>

<button
    type="button"
    class="settings-action"
    data-user-id="${user.user_id}"
    data-action="view-user"
>
    View User
</button>

    </div>
`;

            }).join("");

            if (searchInput) {
    searchInput.addEventListener("input", function () {

        const searchTerm =
            searchInput.value.trim().toLowerCase();

        document
            .querySelectorAll(".admin-user-card")
            .forEach(function (card) {

                const cardText =
                    card.textContent.toLowerCase();

                card.style.display =
                    cardText.includes(searchTerm)
                        ? ""
                        : "none";
            });
    });
}

    } catch (error) {

        console.error(
            "Admin user loading error:",
            error
        );

    }

})();

// ============================================
// ADMIN EDIT USER BALANCE
// ============================================

document.addEventListener("click", async function (event) {

    const button =
        event.target.closest(
            '[data-action="edit-balance"]'
        );

    if (!button) {
        return;
    }

    const userId =
        button.getAttribute("data-user-id");

    if (!userId) {
        return;
    }

    const fieldName =
        prompt(
            "Enter balance type:\n\n" +
            "available_balance\n" +
            "total_invested\n" +
            "portfolio_value"
        );

    if (!fieldName) {
        return;
    }

    const allowedFields = [
        "available_balance",
        "total_invested",
        "portfolio_value"
    ];

    if (!allowedFields.includes(fieldName)) {
        alert("Invalid balance type.");
        return;
    }

    const newValue =
        prompt(
            "Enter the new balance value:"
        );

    if (
        newValue === null ||
        newValue.trim() === ""
    ) {
        return;
    }

    const numericValue =
        Number(newValue);

    if (
        !Number.isFinite(numericValue) ||
        numericValue < 0
    ) {
        alert("Please enter a valid balance.");
        return;
    }

    const reason =
        prompt(
            "Enter the reason for this balance adjustment:"
        );

    if (!reason || !reason.trim()) {
        alert("A reason is required.");
        return;
    }

    const confirmed =
        confirm(
            "Confirm this balance adjustment?\n\n" +
            "New value: $" +
            numericValue.toFixed(2) +
            "\n\nReason: " +
            reason.trim()
        );

    if (!confirmed) {
        return;
    }

    const { error } =
        await supabaseClient.rpc(
            "admin_adjust_balance",
            {
                p_target_user_id: userId,
                p_field_name: fieldName,
                p_new_value: numericValue,
                p_reason: reason.trim()
            }
        );

    if (error) {

        console.error(
            "Balance adjustment error:",
            error
        );

        alert(
            "Balance adjustment failed."
        );

        return;
    }

    alert(
        "Balance updated successfully."
    );

    window.location.reload();

});

// ============================================
// ADMIN VIEW USER
// ============================================

document.addEventListener("click", function (event) {

    const button =
        event.target.closest(
            '[data-action="view-user"]'
        );

    if (!button) {
        return;
    }

    const userId =
        button.getAttribute("data-user-id");

    if (!userId) {
        return;
    }

    window.location.href =
        "admin-user-view.html?user=" +
        encodeURIComponent(userId);

});

// ============================================
// ADMIN PENDING DEPOSITS
// ============================================

(async function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (currentPage !== "admin.html") {
        return;
    }

    const depositRecords =
        document.getElementById(
            "adminDepositRecords"
        );

    if (!depositRecords) {
        return;
    }

    async function loadPendingDeposits() {

        const { data, error } =
            await supabaseClient
                .from("deposits")
                .select(
                    "id, user_id, amount, status, created_at, reference"
                )
                .eq("status", "pending")
                .order("created_at", {
                    ascending: false
                });

        if (error) {
            console.error(
                "Admin deposit loading error:",
                error
            );
            return;
        }

        if (!data || data.length === 0) {

            depositRecords.innerHTML = `
                <span>◉</span>

                <strong>
                    No pending deposit requests
                </strong>

                <p>
                    New deposit requests will appear here.
                </p>
            `;

            return;
        }

        depositRecords.innerHTML =
            data.map(function (deposit) {

                return `
                    <div class="admin-user-card">

                        <div>
                            <strong>
                                Pending Deposit
                            </strong>

                            <p>
                                User:
                                ${deposit.user_id}
                            </p>

                            <small>
                                Reference:
                                ${deposit.reference || "N/A"}
                            </small>
                        </div>

                        <div>

                            <strong>
                                $${Number(
                                    deposit.amount || 0
                                ).toFixed(2)}
                            </strong>

                            <br>

                            <button
                                type="button"
                                class="admin-approve-deposit"
                                data-deposit-id="${deposit.id}"
                            >
                                Approve
                            </button>

                            <button
                                type="button"
                                class="admin-reject-deposit"
                                data-deposit-id="${deposit.id}"
                            >
                                Reject
                            </button>

                        </div>

                    </div>
                `;

            }).join("");
    }

    depositRecords.addEventListener(
        "click",
        async function (event) {

            const approveButton =
                event.target.closest(
                    ".admin-approve-deposit"
                );

            const rejectButton =
                event.target.closest(
                    ".admin-reject-deposit"
                );

            if (!approveButton && !rejectButton) {
                return;
            }

            const button =
                approveButton || rejectButton;

            const depositId =
                button.getAttribute(
                    "data-deposit-id"
                );

            button.disabled = true;

            const originalText =
                button.textContent;

            button.textContent =
                "Processing...";

            try {

                if (approveButton) {

                    const { error } =
                        await supabaseClient.rpc(
                            "complete_deposit",
                            {
                                p_deposit_id:
                                    depositId,

                                p_provider:
                                    "admin",

                                p_provider_payment_id:
                                    `admin-${depositId}`
                            }
                        );

                    if (error) {
                        throw error;
                    }

                } else {

                    const reason =
                        prompt(
                            "Reason for rejecting this deposit:"
                        );

                    if (reason === null) {
                        button.disabled = false;
                        button.textContent =
                            originalText;
                        return;
                    }

                    const { error } =
                        await supabaseClient.rpc(
                            "reject_deposit",
                            {
                                p_deposit_id:
                                    depositId,

                                p_reason:
                                    reason.trim()
                            }
                        );

                    if (error) {
                        throw error;
                    }
                }

                await loadPendingDeposits();

            } catch (error) {

                console.error(
                    "Deposit status update error:",
                    error
                );

                alert(
                    error.message ||
                    "Unable to update deposit status."
                );

                button.disabled = false;

                button.textContent =
                    originalText;
            }

        }
    );

    await loadPendingDeposits();

})();

// ============================================
// ADMIN PENDING WITHDRAWALS
// ============================================

(async function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (currentPage !== "admin.html") {
        return;
    }

    const withdrawalRecords =
        document.getElementById("adminWithdrawalRecords");

    if (!withdrawalRecords) {
        return;
    }

    try {

        const { data, error } =
            await supabaseClient
                .from("withdrawals")
                .select(
                    "id, user_id, amount, status, created_at, reference"
                )
                .eq("status", "pending")
                .order("created_at", {
                    ascending: false
                });

        if (error) {
            console.error(
                "Admin withdrawal loading error:",
                error
            );
            return;
        }

        if (!data || data.length === 0) {
            return;
        }

        withdrawalRecords.innerHTML =
            data.map(function (withdrawal) {

                return `
                    <div class="admin-user-card">

                        <div>
                            <strong>
                                Pending Withdrawal
                            </strong>

                            <p>
                                Reference:
                                ${withdrawal.reference || "N/A"}
                            </p>

                            <small>
                                User:
                                ${withdrawal.user_id}
                            </small>
                        </div>

                        <div>
                            <strong>
                                $${Number(
                                    withdrawal.amount || 0
                                ).toFixed(2)}
                            </strong>

                            <small>
                                Pending
                            </small>
                        </div>

                    </div>
                `;

            }).join("");

    } catch (error) {

        console.error(
            "Admin withdrawal error:",
            error
        );

    }

})();

// ============================================
// ADMIN PENDING INVESTMENTS
// ============================================

(async function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (currentPage !== "admin.html") {
        return;
    }

    const investmentRecords =
        document.getElementById(
            "adminInvestmentRecords"
        );

    if (!investmentRecords) {
        return;
    }

    async function loadPendingInvestments() {

        const { data, error } =
            await supabaseClient
                .from("investments")
                .select(
                    "id, user_id, plan, amount, status, created_at"
                )
                .eq("status", "pending")
                .order("created_at", {
                    ascending: false
                });

        if (error) {

            console.error(
                "Admin investment error:",
                error
            );

            return;
        }

        if (!data || data.length === 0) {

            investmentRecords.innerHTML = `
                <span>◉</span>

                <strong>
                    No pending investment requests
                </strong>

                <p>
                    New investment requests will appear here
                    when they are securely submitted.
                </p>
            `;

            return;
        }

        investmentRecords.innerHTML =
            data.map(function (investment) {

                return `
                    <div class="admin-user-card">

                        <div>
                            <strong>
                                ${investment.plan || "Investment"}
                            </strong>

                            <p>
                                User:
                                ${investment.user_id}
                            </p>

                            <small>
                                Amount:
                                $${Number(
                                    investment.amount || 0
                                ).toFixed(2)}
                            </small>
                        </div>

                        <div>

                            <button
                                type="button"
                                class="admin-approve-investment"
                                data-investment-id="${investment.id}"
                            >
                                Approve
                            </button>

                            <button
                                type="button"
                                class="admin-reject-investment"
                                data-investment-id="${investment.id}"
                            >
                                Reject
                            </button>

                        </div>

                    </div>
                `;

            }).join("");

    }

    investmentRecords.addEventListener(
        "click",
        async function (event) {

            const approveButton =
                event.target.closest(
                    ".admin-approve-investment"
                );

            const rejectButton =
                event.target.closest(
                    ".admin-reject-investment"
                );

            if (!approveButton && !rejectButton) {
                return;
            }

            const button =
                approveButton || rejectButton;

            const investmentId =
                button.getAttribute(
                    "data-investment-id"
                );

            const newStatus =
                approveButton
                    ? "active"
                    : "rejected";

            button.disabled = true;

            const originalText =
                button.textContent;

            button.textContent =
                "Processing...";

            try {

                const { error } =
                    await supabaseClient.rpc(
                        "process_investment_status",
                        {
                            p_investment_id:
                                investmentId,

                            p_status:
                                newStatus
                        }
                    );

                if (error) {
                    throw error;
                }

                await loadPendingInvestments();

            } catch (error) {

                console.error(
                    "Investment status update error:",
                    error
                );

                alert(
                    error.m

// ============================================
// ADMIN PENDING INVESTMENTS
// ============================================

(async function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (currentPage !== "admin.html") {
        return;
    }

    const investmentRecords =
        document.getElementById(
            "adminInvestmentRecor
    if (!investmentRecords) {
        return;
    }

    async function loadPendingInvestments() {

        const { data, error } =
            await supabaseClient
                .from("investments")

                error
            );

            return;
        }

        if (!data || data.length === 0) {

            investmentRecords.innerHTML = `
                <span>◉</span>

                <strong>
                    No pending investment requests
                </strong>

                <p>
                    New investment requests will appear here
                    when they are securely submitted.
                </p>
            `;

            return;
        }

        investmentRecords.innerHTML =
            data.map(function (investment) {

                return `
                    <div class="admin-user-card">

                        <div>
                            <strong>
                                ${investment.plan || "Investment"}
                            </strong>

                            <p>
                                User:
                                ${investment.user_id}
                            </p>

                            <small>
                                Amount:
                                $${Number(
                                    investment.amount || 0
                                ).toFixed(2)}
                            </small>
                        </div>

                        <div>

                            <button
                                type="but
                                class="admin-approve-investment"
                                data-investment-id="${investment.id}"
                            >
                                Approve
                            </button>

                            <button
                                type="button"
                                class="admin-reject-investment"
                                data-investment-id="${investment.id}"
                            >
                                Reject
                            </button>

                        </div>

                    </div>
                `;

            }).join("");

    }

    investmentRecords.addEventListener(
        "click",
        async function (event) {

            const approveButton =
                event.target.closest(
                    ".admin-approve-investment"
                );

            const rejectButton =
                event.target.closest(
                    ".admin-reject-investment"
                );

            if (!approveButton && !rejectButton) {
                return;
            }

            const button =
                approveButton || rejectButton;

            const investmentId =
                button.getAttribute(
                    "data-investment-id"
                );

            const newStatus =
                approveButton
                    ? "active"
                    : "rejected";

            button.disabled = true;

            const originalText =
                button.textContent;

            button.textContent =
                "Processing...";

            try {

                const { error } =
                    await supabaseClient.rpc(
                        "process_investment_status",
                        {
                            p_investment_id:
                                investmentId,

                            p_status:
                                newStatus
                        }
                    );

                if (error) {
                    throw error;
                }

                await loadPendingInvestments();

            } catch (error) {

                console.error(
                    "Investment status update error:",
                    error
                );

                alert(
                    error.message ||
                    "Unable to update investment status."
                );

                button.disabled = false;

                button.textContent =
                    originalText;
            }

        }
    );

    await loadPendingInvestments();

})();