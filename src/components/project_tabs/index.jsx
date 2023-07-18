import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TabContainer, LinearTabs, Tab, Content, TabItem, TabLink, CloseTab } from "./styles";
import { Button, ButtonContainer } from '../../pages/project_intern/styles.js';

const ProjectTabs = ({ tabs, handleRegister }) => {

  const user = useSelector((state) => state.user.currentUser);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const collapsed = useSelector((state) => state.sidebar);


  return (
    <>
      <TabContainer>
        <LinearTabs collapsed={collapsed}>
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

        {activeTab === 0 && <ButtonContainer style={{ marginTop: '100px !important' }}>
          <Button onClick={handleRegister}>Editar Informações</Button>
        </ButtonContainer>}
      
        <Content collapsed={collapsed}>
          {tabs[activeTab].content}
        </Content>
      </TabContainer>
    </>
  );
};

export default ProjectTabs;
