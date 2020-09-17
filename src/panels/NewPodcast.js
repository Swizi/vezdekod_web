import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import CardGrid from "@vkontakte/vkui/dist/components/CardGrid/CardGrid";
import Card from "@vkontakte/vkui/dist/components/Card/Card";
import Icon56GalleryOutline from "@vkontakte/icons/dist/56/gallery_outline";
import Icon24Gallery from "@vkontakte/icons/dist/24/gallery";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import Separator from "@vkontakte/vkui/dist/components/Separator/Separator";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import File from "@vkontakte/vkui/dist/components/File/File";
import ModalCard from "@vkontakte/vkui/dist/components/ModalCard/ModalCard";
import ModalRoot from "@vkontakte/vkui/dist/components/ModalRoot/ModalRoot";

import "./NewPodcast.css";

const osName = platform();

const NewPodcast = (props) => {
  const [popout, setPopout] = useState(false);
  let myref = null;

  const onFileSelected = (e) => {
    e.preventDefault();
    if (document.getElementById("input_music").files[0]) {
      if (
        document.getElementById("input_music").files[0].type == "audio/mpeg"
      ) {
        setPopout(false);
        props.changePodcast(true);
      } else {
        setPopout(true);
        props.changePodcast(false);
      }
    }
  };

  const onImageSelected = (e) => {
    e.preventDefault();
    if (document.getElementById("input_image").files[0]) {
      if (document.getElementById("input_image").files[0].type == "image/png") {
        setPopout(false);
        props.changePodcastInfo(URL.createObjectURL(e.target.files[0]));
      } else {
        setPopout(true);
      }
    }
  };

  return (
    <Panel id={props.id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={props.go} data-to="home">
            {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </PanelHeaderButton>
        }
      >
        Новый подкаст
      </PanelHeader>
      <FormLayout>
        <Div className="podcast_header">
          <div
            style={{
              display: props.podcastInfo.imageUrl == "" ? "none" : "flex",
              width: 72,
              height: 72,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img src={props.podcastInfo.imageUrl} alt="Podcast Image" />
          </div>
          <File
            top="Загрузить картинку"
            id="input_image"
            mode="overlay_secondary"
            onChange={onImageSelected}
            style={{
              height: 72,
              width: 72,
              background: "#F2F3F5",
              marginRight: 12,
              display: props.podcastInfo.imageUrl == "" ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: 72,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon56GalleryOutline
                width="25"
                height="25"
                style={{ color: "#3F8AE0" }}
              />
            </div>
          </File>
          <div style={{ width: "100%" }}>
            <Text className="podcast_form-header">Название</Text>
            <Input
              className="podcast_name-input"
              style={{ margin: "0 !important" }}
              type="email"
              top="E-mail"
              name="email"
              placeholder="Введите название подкаста"
              // value={email}
              // onChange={this.onChange}
              // status={email ? 'valid' : 'error'}
              // bottom={email ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'}
            />
          </div>
        </Div>
        <div className="podcast_description">
          <Text className="podcast_form-header">Описание подкаста</Text>
          <Textarea top="Описание подкаста" />
        </div>
        <Div className="podcast_upload">
          <Title level="3" weight="semibold" className="podcast_upload__title">
            Загрузите Ваш подкаст
          </Title>
          <Text
            weight="regular"
            className="podcast_upload__text"
            style={{ color: "#818C99" }}
          >
            Выберите готовый аудиофайл из вашего телефона и добавьте его
          </Text>
          {/* <Button mode="outline">Загрузить файл</Button> */}
          <File
            top="Загрузить файл"
            mode="outline"
            id="input_music"
            onChange={onFileSelected}
          >
            Загрузить файл
          </File>
        </Div>
        <Separator style={{ marginTop: 8, paddingBottom: 0 }} />
        <div className="podcast_checkboxes">
          <Checkbox>Ненормативный контент</Checkbox>
          <Checkbox>Исключить эпизод из экспорта</Checkbox>
          <Checkbox>Трейлер подкаста</Checkbox>
        </div>
        <div>
          <Cell
            expandable
            description="Всем пользователям"
            size="l"
            onClick={props.go}
            data-to="visibility"
          >
            Кому доступен данный подкаст
          </Cell>
          <Text className="visibility_text">
            При публикации записи с эпизодом, он становится доступным для всех
            пользователей
          </Text>
        </div>
        <Div>
          <Button
            size="xl"
            mode="primary"
            style={{ width: "100%", opacity: props.podcast ? "1" : "0.4" }}
          >
            Далее
          </Button>
        </Div>
      </FormLayout>
      <ModalRoot activeModal={popout ? "modal" : null} style={{ zIndex: 10 }}>
        <ModalCard
          onClose={() => setPopout(false)}
          id="modal"
          // icon={<Icon56MoneyTransferOutline />}
          header="Неправильный формат подкаста"
          caption="Вы выбрали не тот формат, выберите другой."
          actions={[
            {
              title: "Понятно",
              mode: "primary",
              action: () => {
                setPopout(false);
              },
            },
          ]}
        ></ModalCard>
      </ModalRoot>
    </Panel>
  );
};

NewPodcast.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default NewPodcast;
