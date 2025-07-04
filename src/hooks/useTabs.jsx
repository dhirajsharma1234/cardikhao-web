import { useState } from 'react';

const useTabs = (initialTab = 'body-type-tab') => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleKeyDown = (e, tabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabId);
    }
  };

  return { activeTab, handleTabClick, handleKeyDown };
};

export default useTabs;