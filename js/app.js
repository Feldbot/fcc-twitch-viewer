// Shorthand for $(document).ready(function(){});
$(function() {

  // Section selectors
  var all = $("div#all");
  var online = $("div#online");
  var offline = $("div#offline");

  // Clears text before call to append
  var clearData = function() {
    all.html("");
    online.html("");
    offline.html("");
  };

  var currentTab = "all";

  // Nav highlighting helper functions
  function navActive(elem) {
    $(elem).addClass("active").removeClass("inactive");
  }

  function navInactive(elems) {
    $(elems).addClass("inactive").removeClass("active");
  }

  // JSON data response snippet
  // Data here isn't live because of problems accessing the Twitch.tv API
  // This was a recommended solution by Free Code Camp
  var data = [
    {
      stream: {
        mature: false,
        status: "Greg working on Electron-Vue boilerplate w/ Akira #programming #vuejs #electron",
        broadcaster_language: "en",
        display_name: "FreeCodeCamp",
        game: "Creative",
        language: "en",
        _id: 79776140,
        name: "freecodecamp",
        created_at: "2015-01-14T03:36:47Z",
        updated_at: "2016-09-17T05:00:52Z",
        delay: null,
        logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
        banner: null,
        video_banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
        background: null,
        profile_banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png",
        profile_banner_background_color: null,
        partner: false,
        url: "https://www.twitch.tv/freecodecamp",
        views: 161989,
        followers: 10048,
        _links: {
          self: "https://api.twitch.tv/kraken/channels/freecodecamp",
          follows: "https://api.twitch.tv/kraken/channels/freecodecamp/follows",
          commercial: "https://api.twitch.tv/kraken/channels/freecodecamp/commercial",
          stream_key: "https://api.twitch.tv/kraken/channels/freecodecamp/stream_key",
          chat: "https://api.twitch.tv/kraken/chat/freecodecamp",
          subscriptions: "https://api.twitch.tv/kraken/channels/freecodecamp/subscriptions",
          editors: "https://api.twitch.tv/kraken/channels/freecodecamp/editors",
          teams: "https://api.twitch.tv/kraken/channels/freecodecamp/teams",
          videos: "https://api.twitch.tv/kraken/channels/freecodecamp/videos"
        }
      },
      _links: {
        self: "https://api.twitch.tv/kraken/streams/freecodecamp",
        channel: "https://api.twitch.tv/kraken/channels/freecodecamp"
      }
    }, {
      stream: null,
      display_name: "OgamingSC2",
      _links: {
        self: "https://api.twitch.tv/kraken/streams/ogamingsc2",
        channel: "https://api.twitch.tv/kraken/channels/ogamingsc2"
      }
    }, {
      stream: {
        mature: false,
        status: "RERUN: StarCraft 2 - Kane vs. HuK (ZvP) - WCS Season 3 Challenger AM - Match 4",
        broadcaster_language: "en",
        display_name: "ESL_SC2",
        game: "StarCraft II",
        language: "en",
        _id: 30220059,
        name: "esl_sc2",
        created_at: "2012-05-02T09:59:20Z",
        updated_at: "2016-09-17T06:02:57Z",
        delay: null,
        logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg",
        banner: null,
        video_banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-channel_offline_image-5a8657f8393c9d85-1920x1080.jpeg",
        background: null,
        profile_banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_banner-f8295b33d1846e75-480.jpeg",
        profile_banner_background_color: "#050506",
        partner: true,
        url: "https://www.twitch.tv/esl_sc2",
        views: 60843789,
        followers: 135275,
        _links: {
          self: "https://api.twitch.tv/kraken/channels/esl_sc2",
          follows: "https://api.twitch.tv/kraken/channels/esl_sc2/follows",
          commercial: "https://api.twitch.tv/kraken/channels/esl_sc2/commercial",
          stream_key: "https://api.twitch.tv/kraken/channels/esl_sc2/stream_key",
          chat: "https://api.twitch.tv/kraken/chat/esl_sc2",
          subscriptions: "https://api.twitch.tv/kraken/channels/esl_sc2/subscriptions",
          editors: "https://api.twitch.tv/kraken/channels/esl_sc2/editors",
          teams: "https://api.twitch.tv/kraken/channels/esl_sc2/teams",
          videos: "https://api.twitch.tv/kraken/channels/esl_sc2/videos"
        }
      },
      _links: {
        self: "https://api.twitch.tv/kraken/streams/esl_sc2",
        channel: "https://api.twitch.tv/kraken/channels/esl_sc2"
      }
    }, {
      stream: null,
      display_name: "noobs2ninjas",
      _links: {
        self: "https://api.twitch.tv/kraken/streams/esl_sc2",
        channel: "https://api.twitch.tv/kraken/channels/esl_sc2"
      }
    }, {
      error: "Not Found",
      status: 404,
      message: "Channel 'not-a-valid-account' does not exist"
    }
  ];

  // Nav click handlers
  $(".nav").click(function(e) {
    if (e.target.id === "navAll") {
      navActive(this);
      navInactive("#navOnline, #navOffline");
      currentTab = "all";
    }
    if (e.target.id === "navOnline") {
      navActive(this);
      navInactive("a#navAll, a#navOffline");
      currentTab = "online";
    }
    if (e.target.id === "navOffline") {
      navActive(this);
      navInactive("a#navAll, a#navOnline");
      currentTab = "offline";
    }

    clearData();
    allTwitchers(data);
  });

  // Filter and append data by active tab
  function allTwitchers(data) {

    // Data is array of objects, i is index (0-5), value is object data
    $.each(data, function(i, value) {

      // console.log('data:', data, 'i:', i, 'value:', value)

      // Offline twitchers - render no logo (grey circle), name, status;
      if (value.stream === null) {
        if (currentTab === "all" || currentTab === "offline") {
          all.append(`
            <a href="${value._links.channel}" target="_blank">
              <div class="selection">
                <div class="logo">
                  <span class="noLogo"></span>
                </div>
                <div class="name">
                  <p class="twitcher">${value.display_name}
                </div>
                <div class="streaming">
                  <p class="status"> No stream available </p>
                </div>
              </div>
            </a>`);
      }

      // Error case
      } else if (value.status === 404) {
        console.log('Error:', value.error);

      // Online twitchers - render logo, name, status
      } else if (currentTab === "all" || currentTab === "online") {
        all.append(`
          <a href="${value.stream.url}" target="_blank">
            <div class="selection">
              <div class="logo">
                <img src="${value.stream.logo}">
              </div>
              <div class="name">
                <p class="twitcher">${value.stream.display_name}</p>
              </div>
              <div class="streaming">
                <p class="status">${value.stream.status}</p>
              </div>
            </div>
          </a>`);
      }
    });
  }

  allTwitchers(data);
});


/***** NOTES ****/

// The API changed and requires account and id. The FCC workaround endpoint gives a 404 error. FCC recommended using JSON code snippet instead of accessing API.
// https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-how-to-use-the-twitchtv-api/19541/35
