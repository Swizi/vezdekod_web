import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import View from "@vkontakte/vkui/dist/components/View/View";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import NewPodcast from "./panels/NewPodcast";
import UserVisibility from "./panels/Visibility";

const App = () => {
  const [podcast, setPodcast] = useState(false);
  const [podcastInfo, setPodcastInfo] = useState({
    imageUrl: "",
    name: "",
    description: "",
  });
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [visibility, setVisibility] = useState("all_users");
  // const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      // setPopout(null);
    }
    fetchData();
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  const changePodcast = (state) => {
    setPodcast(state);
  };

  const changePodcastInfo = (info) => {
    setPodcastInfo({...podcastInfo, imageUrl: info});
  };

  return (
    <View activePanel={activePanel} go={go}>
      <Home id="home" fetchedUser={fetchedUser} go={go} changePodcast={changePodcast} changePodcastInfo={changePodcastInfo}/>
      <NewPodcast
        id="new_podcast"
        go={go}
        visibility={visibility}
        podcast={podcast}
		changePodcast={changePodcast}
		podcastInfo={podcastInfo}
		changePodcastInfo={changePodcastInfo}
      />
      <UserVisibility id="visibility" go={go} visibility={visibility} />
    </View>
  );
};

export default App;
