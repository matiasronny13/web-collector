import { useEffect, useState } from 'react'
import './App.css'
import { Input, Tree, message } from 'antd'
import { DataNode } from 'antd/es/tree';
import Search from 'antd/es/input/Search';
import TextArea from 'antd/es/input/TextArea';

class SiteInfo {
  url?: string | undefined; 
  title?: string | undefined; 
  note?: string | undefined; 
  tags: number[]; 
  
  constructor() {
    this.tags = [];
  }
}

class DataState {
  tagDataNodes: DataNode[]; 
  siteInfo: SiteInfo; 
  error?: string | undefined; 

  constructor() {
    this.tagDataNodes = [];
    this.siteInfo = new SiteInfo();
  }
}

function App() {
  const [count, setCount] = useState("")
  const [dataState, setDataState] = useState<DataState>(new DataState());
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();

  // const offlineData = () => {
  //   const temp:DataState = new DataState();
  //   temp.tagDataNodes = [{key:1, title:"React", children:[{key:4, title:"React 6", children:[]}]}, {key:2, title:"React 1", children:[]}, {key:3, title:"React 2", children:[]}];
  //   return temp;
  // }

  const fetchData = async () => {
    //const response:DataState = {error: "adaafasf", tagDataNodes:[]}//offlineData(); // use this for debugging
    const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.runtime.sendMessage({command: "get-state", param: {url: tabs[0].url}});

    if (response.error) 
    {
      messageApi.open({type: 'error', content: response.error, duration: 7})
    } 
    if(!response.siteInfo)
    {
      response.siteInfo = new SiteInfo();
    }
    setDataState(() => response);
    setCheckedKeys(() => response.siteInfo.tags);
  }

  useEffect(() => {
    fetchData().catch(console.error); 
  }, []);

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
    temp.siteInfo.tags = checkedKeysValue as number[];
    setDataState(temp);
  };

  const onSelect = (selectedKeysValue: React.Key[]) => {
    //console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <>
      {contextHolder}
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
      <div className="card">
        <button onClick={() => setCount(() => JSON.stringify(dataState))}>
          {count}
        </button>
      </div>
    </>
  )
}

export default App
