import { useEffect, useState } from 'react'
import './App.css'
import { Input, Tree } from 'antd'
import { DataNode } from 'antd/es/tree';
import Search from 'antd/es/input/Search';
import TextArea from 'antd/es/input/TextArea';

type TSiteInfo = {
  url?: string | undefined; 
  title?: string | undefined; 
  note?: string | undefined; 
  tags?: number[] | undefined; 
}

type TDataState = {
  tagDataNodes?: DataNode[] | undefined; 
  siteInfo?: TSiteInfo | undefined; 
  status?: boolean | undefined; 
  error?: string | undefined; 
}

function App() {
  const [count, setCount] = useState("")
  const [dataState, setDataState] = useState<TDataState | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const fetchData = async () => {
    const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.runtime.sendMessage({command: "get-state", param: {url: tabs[0].url}});
    if(response?.tagDataNodes)
    {
      setDataState(() => response);
      if(response.siteInfo)
      {
        setCheckedKeys(() => response.siteInfo.tags.map((a:number) => a.toString()))      //TODO: convert keys to integer
      }
    }
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
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);

    const temp = {...dataState};
    if(temp?.siteInfo)
    {
      temp.siteInfo.tags = checkedKeysValue.map(k => parseInt(k.toString()))
      setDataState(temp);
    }
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <>
      <Input placeholder="Title" value={dataState?.siteInfo?.title} />
      <TextArea rows={4} placeholder="Notes" maxLength={200} value={dataState?.siteInfo?.note} />
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
      />
      <div className="card">
        <button onClick={() => setCount(() => JSON.stringify(dataState))}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
