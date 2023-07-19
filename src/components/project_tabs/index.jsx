import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TabContainer, LinearTabs, Tab, Content, TabItem, TabLink, CloseTab } from "./styles";
import { Button, ButtonContainer } from '../../pages/project_intern/styles.js';

const ProjectTabs = ({ tabs, handleRegister, project }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [activeTab, setActiveTab] = useState(0);
  const collapsed = useSelector((state) => state.sidebar);
  let status = project.status;

  // Check if status is null on component mount and whenever it changes
  useEffect(() => {
    if (status === null) {
      setActiveTab(0); // If status is null, set activeTab to 0
    }
  }, [status]);

  const handleTabClick = (index) => {
    // Allow changing activeTab only if status is not null or if index is 0 or 1
    if (status !== null || index === 0 || index === 1) {
      setActiveTab(index);
    }
  };

  return (
    <>
      <TabContainer>
        <LinearTabs collapsed={collapsed}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              active={activeTab === index}
              onClick={() => handleTabClick(index)}
              status={status}
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
