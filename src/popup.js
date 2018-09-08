
const accounts = document.getElementById("accounts");

document.getElementById("save").onclick = () => {
    chrome.cookies.get({
        "url": "https://github.com",
        "name": "dotcom_user"
    }, username => {
        chrome.cookies.get({
            "url": "https://github.com",
            "name": "user_session"
        }, sessionValue => {
            const obj = {};
            obj[username.value] = sessionValue.value;
            chrome.storage.local.set(obj);
            loadAccounts();
        });
    });
};
document.getElementById("clear").onclick = () => {
    chrome.storage.local.clear();
    loadAccounts();
};
document.getElementById("loginpage").onclick = () => {
    chrome.cookies.set({
        "url": "https://github.com",
        "name": "user_session",
        "value": "dummy"
    }, () => {
        chrome.tabs.update({
            "url": "https://github.com/login"
        }, () => window.close());
    });
};

function loadAccounts() {
    [...accounts.children].forEach(child => child.remove());
    chrome.storage.local.get(null, all => {
        for (const username in all) {
            const btn = document.createElement("button");
            btn.appendChild(document.createTextNode(username));
            btn.onclick = () => {
                chrome.cookies.set({
                    "url": "https://github.com",
                    "name": "user_session",
                    "value": all[username]
                }, () => {
                    chrome.tabs.reload(() => window.close());
                });
            };
            accounts.appendChild(btn);
        }
    });
}

loadAccounts();