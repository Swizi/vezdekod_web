import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import Icon56AddCircleOutline from "@vkontakte/icons/dist/56/add_circle_outline";

import "./Home.css";

const Home = ({ id, go, fetchedUser, changePodcast, changePodcastInfo }) => {
//   useEffect(() => {
//     // Обновляем заголовок документа с помощью API браузера
//     changePodcast(false);
//     changePodcastInfo("");
//   });

  return (
    <Panel id={id}>
      <PanelHeader>Подкасты</PanelHeader>
      {fetchedUser && (
        <Group title="User Data Fetched with VK Bridge">
          <Cell
            before={
              fetchedUser.photo_200 ? (
                <Avatar src={fetchedUser.photo_200} />
              ) : null
            }
            description={
              fetchedUser.city && fetchedUser.city.title
                ? fetchedUser.city.title
                : ""
            }
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>
      )}

      <Group title="Navigation Example" className="home-container">
        <Div className="home-main">
          {/* <Button size="xl" level="2" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button> */}
          <Icon56AddCircleOutline
            width={48}
            height={48}
            className="home_icon"
          />
          <Title level="3" weight="semibold" className="home_title">
            Добавьте первый подкаст
          </Title>
          <Text weight="regular" className="home_text">
            Добавляйте, редактируйте и делитесь подкастами вашего сообщества.
          </Text>
          <Button onClick={go} data-to="new_podcast">
            Добавить подкаст
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
