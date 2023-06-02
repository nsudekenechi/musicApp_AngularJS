let app = angular.module("app", []);
let audio = document.querySelector("audio");
app.controller("controller", ($scope, $http, $timeout) => {
  $scope.songs = {
    new: [],
    new1: [],
    popular: [],
    playList: [],
  };
  $scope.title;
  $scope.artist;
  $scope.cover;
  $scope.audio;
  $scope.playIcon = "Play.svg";
  $http.get("https://musica-api.up.railway.app/new").then((response) => {
    $scope.songs.new = [...response.data];
    $scope.songs.new2 = [...response.data];

    let i = Math.floor(Math.random() * $scope.songs.new.length);
    $scope.loadSong = (i) => {
      $scope.title = $scope.songs.new[i].title;
      $scope.artist = $scope.songs.new[i].artist;
      $scope.cover = $scope.songs.new[i].cover;
      $scope.audio = $scope.songs.new[i].audio;
    };

    $scope.playSong = () => {
      if ($scope.playIcon == "Play.svg") {
        $scope.playIcon = "Pause.svg";
        audio.play();
      } else {
        $scope.playIcon = "Play.svg";
        audio.pause();
      }
    };
    $scope.nextSong = () => {
      i++;
      i >= $scope.songs.new.length ? (i = 0) : i;
      $scope.loadSong(i);

      if ($scope.playIcon == "Pause.svg") {
        audio.autoplay = true;
      } else {
        audio.autoplay = false;
      }
    };
    $scope.prevSong = () => {
      i--;
      i <= 0 ? (i = $scope.songs.new.length - 1) : i;
      $scope.loadSong(i);
      if ($scope.playIcon == "Pause.svg") {
        audio.autoplay = true;
      } else {
        audio.autoplay = false;
      }
    };

    $scope.shuffleSong = () => {
      $scope.songs.new.sort(() => 0.5 - Math.random());
      $scope.loadSong(i);
    };
    $scope.loadSong(i);

    $scope.getSong = (title, cover, artist, music) => {
      $scope.title = title;
      $scope.artist = artist;
      $scope.cover = cover;
      $scope.audio = music;
      if ($scope.playIcon == "Play.svg") {
        $scope.playIcon = "Pause.svg";
      }
      audio.autoplay = true;
    };
    $scope.repeatIcons = ["repeat.svg", "repeat-all.svg", "repeate-one.svg"];
    $scope.repeatIcon = $scope.repeatIcons[0];
    let k = 0;
    $scope.repeat = () => {
      k >= $scope.repeatIcons.length - 1 ? (k = 0) : k++;

      $scope.repeatIcon = $scope.repeatIcons[k];
    };

    audio.onended = function () {
      $timeout(() => {
        $scope.nextSong();
      }, 10);
    };
  });
});
