import React, { useState } from "react";
import { TabContainer, LinearTabs, Tab, Content } from "./styles";

const ProjectTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <TabContainer>
      <LinearTabs>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </Tab>
        ))}
      </LinearTabs>
      <Content>
        {tabs[activeTab].content}
      </Content>
    </TabContainer>
  );
};

export default ProjectTabs;
