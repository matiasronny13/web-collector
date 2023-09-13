import { ChangeEvent, useEffect, useState } from 'react'
import './App.scss'
import { Tree, message } from 'antd'
import { DataNode } from 'antd/es/tree';

class SiteInfo {
  id?:string | undefined;
  url?: string | undefined; 
  title?: string | undefined; 
  note?: string | undefined; 
  tags?: number[] | undefined; 
}

class DataState {
  tagDataNodes?: DataNode[]; 
  siteInfo?: SiteInfo; 
  error?: string | undefined; 
}

function App() {
  const [dataState, setDataState] = useState<DataState>(new DataState());
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [activeTabId, setActiveTabId] = useState(0)

  const offlineData = () => {
    const temp:DataState = new DataState();
    temp.siteInfo = new  SiteInfo();
    temp.siteInfo.url = "https:dfsfslkfskfsdkflhsdfklsdflksdhfklssdklfsdkgsdfklsdkflhsdklfhsdkfdkfskfskdjnfkjsdfnksjdfdsfkjh"
    temp.tagDataNodes = [{key:1, title:"React", children:[{key:4, title:"React 6", children:[]}]}, {key:2, title:"React 1", children:[]}, {key:3, title:"React 2", children:[]}];
    return temp;
  }

  const fetchData = async () => {
    const isOffline = false;

    if(isOffline)
    {
      const response:DataState = offlineData(); // use this for debugging
      bindResponse(response);
    }
    else
    {
      const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      const response = await chrome.runtime.sendMessage({command: "get-state", param: {url: tabs[0].url}});
      bindResponse(response)
      setActiveTabId(() => tabs[0].id ?? 0)
    }
  }

  const bindResponse = (response: DataState) => {
    if (response.error) 
    {
      messageApi.open({type: 'error', content: response.error, duration: 7})
    } 
    setDataState(() => response);
    setCheckedKeys(() => response.siteInfo?.tags as number[]);
  }

  useEffect(() => {
    fetchData(); //.catch(console.error); TODO: need to handle error?
  }, []);

  const onResetDataState = () => {
    fetchData();
  };

  const loadImage = (thumbnailData:string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = thumbnailData;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });
  };

  function captureVisibleTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.get(activeTabId, async () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        
        try {
          const screenshotData = await chrome.tabs.captureVisibleTab({ format: 'png' });
          resolve(screenshotData);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  const getThumbnail = async () => {
    const thumbnailData:any = await captureVisibleTab();
    const img:any = await loadImage(thumbnailData)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const newWidth = 300; // Adjust as needed
    const newHeight = 180; // Adjust as needed
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx?.drawImage(img, 0, 0, newWidth, newHeight);
    return canvas.toDataURL('image/png');
  }

  const onSaveChanges = () => {
    const asyncSaveChanges = async() => {
      const thumbnailData = await getThumbnail()
      chrome.runtime.sendMessage({command: "save-site-info", siteInfo: dataState.siteInfo, thumbnailData: thumbnailData}, (response) => bindResponse(response));
    }    
    asyncSaveChanges();
  };

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    //console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);

    const temp = {...dataState};
    temp.siteInfo!.tags = checkedKeysValue as number[];
    setDataState(temp);
  };

  const onSelect = (selectedKeysValue: React.Key[]) => {
    //console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  const onTitleChange = (event:ChangeEvent<HTMLInputElement>) => setDataState((prev)=> ({...prev, siteInfo: {...prev.siteInfo, title: event.target.value}}));
  const onNoteChange = (event:ChangeEvent<HTMLTextAreaElement>) => setDataState((prev)=> ({...prev, siteInfo: {...prev.siteInfo, note: event.target.value}}));

  return (
    <div className='app'>
      {contextHolder}
      <div title={dataState?.siteInfo?.url} className='siteUrl'>{dataState?.siteInfo?.url}</div>
      <input type="text" placeholder="Title" value={dataState?.siteInfo?.title} onChange={onTitleChange}/>
      <textarea rows={3} placeholder="Note" maxLength={200} value={dataState?.siteInfo?.note} onChange={onNoteChange}/>
      <Tree
        checkable
        //checkStrictly={true}  causing paylod structure changing
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={(e) => onCheck(e as React.Key[])}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={dataState?.tagDataNodes}
        height={300}
      />
      <div className="commandBar">
        <button onClick={onSaveChanges}>Save</button>
        <button onClick={onResetDataState}>Reset</button>
      </div>
    </div>
  )
}

export default App
