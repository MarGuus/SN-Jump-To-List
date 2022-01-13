// background.js
chrome.action.onClicked.addListener((tab) => {

    let currentURL = tab.url;
    if ((currentURL.includes("nav_to.do") || currentURL.includes(".do")) && !currentURL.includes("_list.do")) {
        let newUrl = addListParameter(currentURL);
        console.log("new url: " + newUrl);
        chrome.tabs.update(undefined, { url: newUrl });

    } else{
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: wrongUrl,
            args: [currentURL],
        });
       

    }

    function wrongUrl (url){

        if (url.includes("_list")){
            alert("already in a list!");
        } else {
            alert("not in a servicenow window!");
        }

    }

    function addListParameter(url) {

        const regex = /(?<!nav_to)\.do/;

        let newUrl = url.replace(regex, '_list.do');
       
        return newUrl;

    }

});
