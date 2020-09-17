import React from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import RichCell from "@vkontakte/vkui/dist/components/RichCell/RichCell";

import "./Visibility.css";

const osName = platform();

const Visibility = (props) => (
  <Panel id={props.id}>
    <PanelHeader
      left={
        <PanelHeaderButton onClick={props.go} data-to="new_podcast">
          {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
        </PanelHeaderButton>
      }
    >
      Кому доступен данный подкаст
    </PanelHeader>
    <RichCell onClick={props.go} data-to="new_podcast">Всем пользователям</RichCell>
    <RichCell onClick={props.go} data-to="new_podcast">Друзьям и друзьям друзей</RichCell>
    <RichCell onClick={props.go} data-to="new_podcast">Только друзьям</RichCell>
    <RichCell onClick={props.go} data-to="new_podcast">Только себе</RichCell>
  </Panel>
);

Visibility.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Visibility;
