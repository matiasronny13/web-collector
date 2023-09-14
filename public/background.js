(async () => {
    //TODO: move to external lib
    const md5 = ($) => {function _($,_){return $<<_|$>>>32-_}function x($,_){var x,r,F,n,C;return(F=2147483648&$,n=2147483648&_,x=1073741824&$,r=1073741824&_,C=(1073741823&$)+(1073741823&_),x&r)?2147483648^C^F^n:x|r?1073741824&C?3221225472^C^F^n:1073741824^C^F^n:C^F^n}function r($,_,x){return $&_|~$&x}function F($,_,x){return $&x|_&~x}function n($,_,x){return $^_^x}function C($,_,x){return _^($|~x)}function t($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D&E|~D&(o=n)),C),A)),x(_($,t),r)}function A($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D&(o=n)|E&~o),C),A)),x(_($,t),r)}function D($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D^E^(o=n)),C),A)),x(_($,t),r)}function E($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,E^(D|~(o=n))),C),A)),x(_($,t),r)}function o($){var _,x,r="",F="";for(x=0;x<=3;x++)r+=(F="0"+(_=$>>>8*x&255).toString(16)).substr(F.length-2,2);return r}var e,B,u,f,a,c,i,h,v,d=[];for(e=0,d=function $(_){for(var x,r=_.length,F=r+8,n=((F-F%64)/64+1)*16,C=Array(n-1),t=0,A=0;A<r;)x=(A-A%4)/4,t=A%4*8,C[x]=C[x]|_.charCodeAt(A)<<t,A++;return x=(A-A%4)/4,t=A%4*8,C[x]=C[x]|128<<t,C[n-2]=r<<3,C[n-1]=r>>>29,C}($=function $(_){_=_.replace(/\r\n/g,"\n");for(var x="",r=0;r<_.length;r++){var F=_.charCodeAt(r);F<128?x+=String.fromCharCode(F):F>127&&F<2048?(x+=String.fromCharCode(F>>6|192),x+=String.fromCharCode(63&F|128)):(x+=String.fromCharCode(F>>12|224),x+=String.fromCharCode(F>>6&63|128),x+=String.fromCharCode(63&F|128))}return x}($)),c=1732584193,i=4023233417,h=2562383102,v=271733878;e<d.length;e+=16)B=c,u=i,f=h,a=v,c=t(c,i,h,v,d[e+0],7,3614090360),v=t(v,c,i,h,d[e+1],12,3905402710),h=t(h,v,c,i,d[e+2],17,606105819),i=t(i,h,v,c,d[e+3],22,3250441966),c=t(c,i,h,v,d[e+4],7,4118548399),v=t(v,c,i,h,d[e+5],12,1200080426),h=t(h,v,c,i,d[e+6],17,2821735955),i=t(i,h,v,c,d[e+7],22,4249261313),c=t(c,i,h,v,d[e+8],7,1770035416),v=t(v,c,i,h,d[e+9],12,2336552879),h=t(h,v,c,i,d[e+10],17,4294925233),i=t(i,h,v,c,d[e+11],22,2304563134),c=t(c,i,h,v,d[e+12],7,1804603682),v=t(v,c,i,h,d[e+13],12,4254626195),h=t(h,v,c,i,d[e+14],17,2792965006),i=t(i,h,v,c,d[e+15],22,1236535329),c=A(c,i,h,v,d[e+1],5,4129170786),v=A(v,c,i,h,d[e+6],9,3225465664),h=A(h,v,c,i,d[e+11],14,643717713),i=A(i,h,v,c,d[e+0],20,3921069994),c=A(c,i,h,v,d[e+5],5,3593408605),v=A(v,c,i,h,d[e+10],9,38016083),h=A(h,v,c,i,d[e+15],14,3634488961),i=A(i,h,v,c,d[e+4],20,3889429448),c=A(c,i,h,v,d[e+9],5,568446438),v=A(v,c,i,h,d[e+14],9,3275163606),h=A(h,v,c,i,d[e+3],14,4107603335),i=A(i,h,v,c,d[e+8],20,1163531501),c=A(c,i,h,v,d[e+13],5,2850285829),v=A(v,c,i,h,d[e+2],9,4243563512),h=A(h,v,c,i,d[e+7],14,1735328473),i=A(i,h,v,c,d[e+12],20,2368359562),c=D(c,i,h,v,d[e+5],4,4294588738),v=D(v,c,i,h,d[e+8],11,2272392833),h=D(h,v,c,i,d[e+11],16,1839030562),i=D(i,h,v,c,d[e+14],23,4259657740),c=D(c,i,h,v,d[e+1],4,2763975236),v=D(v,c,i,h,d[e+4],11,1272893353),h=D(h,v,c,i,d[e+7],16,4139469664),i=D(i,h,v,c,d[e+10],23,3200236656),c=D(c,i,h,v,d[e+13],4,681279174),v=D(v,c,i,h,d[e+0],11,3936430074),h=D(h,v,c,i,d[e+3],16,3572445317),i=D(i,h,v,c,d[e+6],23,76029189),c=D(c,i,h,v,d[e+9],4,3654602809),v=D(v,c,i,h,d[e+12],11,3873151461),h=D(h,v,c,i,d[e+15],16,530742520),i=D(i,h,v,c,d[e+2],23,3299628645),c=E(c,i,h,v,d[e+0],6,4096336452),v=E(v,c,i,h,d[e+7],10,1126891415),h=E(h,v,c,i,d[e+14],15,2878612391),i=E(i,h,v,c,d[e+5],21,4237533241),c=E(c,i,h,v,d[e+12],6,1700485571),v=E(v,c,i,h,d[e+3],10,2399980690),h=E(h,v,c,i,d[e+10],15,4293915773),i=E(i,h,v,c,d[e+1],21,2240044497),c=E(c,i,h,v,d[e+8],6,1873313359),v=E(v,c,i,h,d[e+15],10,4264355552),h=E(h,v,c,i,d[e+6],15,2734768916),i=E(i,h,v,c,d[e+13],21,1309151649),c=E(c,i,h,v,d[e+4],6,4149444226),v=E(v,c,i,h,d[e+11],10,3174756917),h=E(h,v,c,i,d[e+2],15,718787259),i=E(i,h,v,c,d[e+9],21,3951481745),c=x(c,B),i=x(i,u),h=x(h,f),v=x(v,a);return(o(c)+o(i)+o(h)+o(v)).toLowerCase()}
    
    class SiteInfo
    {
        constructor(url, title) {
            this.id = "";
            this.url = url;
            this.title = title;
            this.note = "";
            this.tags = [];
        }
    }
    
    // const state = {
    //     //tagDataNodes: null,
    //     //siteInfo: null,
    // }

    const populateTagDataNodes = () => {
        fetch('http://localhost/api/tags', {method: "GET", headers: {'Accept': 'application/json'}})
        .then(response => {
            if(response.status == "200") 
                return response.json();
            else    
                throw new Error(response.statusText);
        })
        .then(json => {
            chrome.storage.session.set({ tagDataNodes: arrayToTree(json) });
        })
        .catch(error => {
            chrome.notifications.create({
                type: "basic",
                title: "Populate Tags",
                message: `Error fetching tags. ${error.message}`,
                iconUrl: "/icon-default.png",
            })
        });  
    }

    /**
     * 
     * @param {SiteInfo} siteInfo 
     */
    const validateUrl = (siteInfo) => {          
        const hash = md5(siteInfo.url);
        fetch(`http://localhost/api/collection/${hash}`, {method: "GET", headers: {'Accept': 'application/json'}})
        .then(response => {
            if(response.status == "200") 
                return response.json();
            else    
                throw new Error(response.statusText);
        })
        .then(result => {        
            chrome.action.setIcon({ path: "/icon-tagged.png" }); //TODO: optimize by storing image in cache
            chrome.storage.session.set({ siteInfo: result });
        })
        .catch(error => {
            chrome.action.setIcon({ path: "/icon-default.png" });
            chrome.storage.session.set({ siteInfo: siteInfo });
        });  
    };

    const saveSiteinfo = async (sendResponse, data, thumbnailData) => {
        const state = await chrome.storage.session.get(["tagDataNodes", "siteInfo"])

        let httpMethod = "PUT"
        if(!data.id) {
            httpMethod = "POST"
            data.id = md5(data.url.trim());
        }
        
        fetch("http://localhost/api/collection", {
            method: httpMethod, 
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
            body:JSON.stringify({...data, thumbnailData: thumbnailData})
        })
        .then(response => {
            if(response.status == "200" || response.status == "201") 
                return response.json();
            else    
                throw new Error(response.statusText);
        })
        .then(json => {
            if(state.siteInfo.url == data.url) //make sure state has not been overwritten by other async task
            {            
                state.siteInfo = json;
                chrome.action.setIcon({ path: "/icon-tagged.png" });
                chrome.storage.session.set({ siteInfo: json });
                chrome.notifications.create({
                    type: "image",
                    title: "Saving page",
                    message: "Page successfuly saved",
                    iconUrl: "/icon-tagged.png",
                    imageUrl: thumbnailData
                })
            }
        })
        .catch(error => {
            state.error = error.message
            chrome.notifications.create({
                type: "basic",
                title: "Saving page",
                message: `Page failed to save. ${error.message}`,
                iconUrl: "/icon-default.png",
            })
        })
        .finally(() => {
            sendResponse(state)
        }); 
    }

    const arrayToTree = (arr, parentId = 0) => arr
        .filter((item) => item.parentId === parentId)
        .map((child) => ({...child, key: child.id, children: arrayToTree(arr, child.id) }))
        .sort((x, y) => (x.title > y.title) ? 1 : -1);

    chrome.tabs.onActivated.addListener((activeInfo) => {
        chrome.tabs.get(activeInfo.tabId, (tab) => {
            if (tab && tab.url) { 
                validateUrl(new SiteInfo(tab.url, tab.title));
            }
        });
    });

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.url) {
            validateUrl(new SiteInfo(changeInfo.url, tab.title));
        }
    });

    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
            switch (request.command)
            {
                case "get-state":
                    chrome.storage.session.get(["tagDataNodes", "siteInfo"]).then(result => {
                        sendResponse(result);
                    });
                    break;
                case "save-site-info":
                    saveSiteinfo(sendResponse, request.siteInfo, request.thumbnailData);
                    break;
                default:
                    sendResponse({error: "command not found"});
            }
            
            return true; //workaround to fix connection close due to calling another async
        }
    );

    populateTagDataNodes()
})();

