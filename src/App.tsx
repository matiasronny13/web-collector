import { useEffect, useState } from 'react'
import './App.scss'
import { Input, Tree, message } from 'antd'
import { DataNode } from 'antd/es/tree';
import Search from 'antd/es/input/Search';
import TextArea from 'antd/es/input/TextArea';

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

  // const offlineData = () => {
  //   const temp:DataState = new DataState();
  //   temp.siteInfo = new  SiteInfo();
  //   temp.siteInfo.url = "https:dfsfslkfskfsdkflhsdfklsdflksdhfklssdklfsdkgsdfklsdkflhsdklfhsdkfdkfskfskdjnfkjsdfnksjdfdsfkjh"
  //   temp.tagDataNodes = [{key:1, title:"React", children:[{key:4, title:"React 6", children:[]}]}, {key:2, title:"React 1", children:[]}, {key:3, title:"React 2", children:[]}];
  //   return temp;
  // }

  const fetchData = async () => {
    //const response:DataState = offlineData(); // use this for debugging
    const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.runtime.sendMessage({command: "get-state", param: {url: tabs[0].url}});

    if (response.error) 
    {
      messageApi.open({type: 'error', content: response.error, duration: 7})
    } 
    setDataState(() => response);
    setCheckedKeys(() => response.siteInfo.tags);
  }

  useEffect(() => {
    fetchData(); //.catch(console.error); TODO: need to handle error?
  }, []);

  const onResetDataState = () => {
    fetchData();
  };

  const onSaveChanges = () => {
    const asyncSaveChanges = async() => {
      await chrome.runtime.sendMessage({command: "save-site-info", siteInfo: dataState.siteInfo});
    }
    asyncSaveChanges();
  };

  // const onTextChange = (event:KeyboardEvent<HTMLInputElement>) => {
    
  // }

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

  return (
    <div className='app'>
      {contextHolder}
      <div title={dataState?.siteInfo?.url} className='siteUrl'>{dataState?.siteInfo?.url}</div>
      <Input placeholder="Title" value={dataState?.siteInfo?.title} />
      <TextArea rows={3} placeholder="Notes" maxLength={200} value={dataState?.siteInfo?.note} />
      <Search style={{ marginBottom: 8 }} placeholder="Search" />
      <Tree
        checkable
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
