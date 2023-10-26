import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Filter1 from "../components/Filter1";
import Filter2 from "../components/Filter2";
import Filter3 from "../components/Filter3";
import Filter4 from "../components/Filter4";
import Filter5 from "../components/Filter5";
import Filter6 from "../components/Filter6";
import Filter7 from "../components/Filter7";
import Filter8 from "../components/Filter8";
import Filter9 from "../components/Filter9";
import Filter10 from "../components/Filte10";

const data = {
  crown:[
    {id:"crown-pic1", src: require("../assets/crown-pic1.png")},
    {id:"crown-pic2", src: require("../assets/crown-pic2.png")},
    {id:"crown-pic3", src: require("../assets/crown-pic3.png")}
  ],
  flowers:[
    {id:"flower-pic1", src: require("../assets/flower-pic1.png")},
    {id:"flower-pic2", src: require("../assets/flower-pic2.png")},
    {id:"flower-pic3", src: require("../assets/flower-pic3.png")}
  ],
  hairs:[{id:"hair-pic1", src: require("../assets/hair-pic1.png")}],
  hats:[
    {id:"hat-pic1", src: require("../assets/hat-pic1.png")},
    {id:"hat-pic2", src: require("../assets/hat-pic2.png")}

  ],
  Others:[
    {id:"crown-pic1", src: require("../assets/crown-pic1.png")},
    {id:"crown-pic2", src: require("../assets/crown-pic2.png")},
    {id:"crown-pic3", src: require("../assets/crown-pic3.png")}
  ]
};

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
      current_filter: "crown-pic1"
    };

    this.onFacesDetected = this.onFacesDetected.bind(this);
  }

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onFacesDetected({ faces }) {
    this.setState({ faces: faces });
  }

  render() {
    var { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>Sin acceso a la cámara</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.upperContainer}>
          <Image
            source={require("../assets/appIcon.png")}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>Mira aquí....</Text>
        </View>
        <View style={styles.middleContainer}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
          {this.state.faces.map(face => {
            <Filter
              key={'face-id-${face.fadeID}'}
              face={face}
              source={filters[this.state.current_filter].src}
              width={filters[this.state.current_filter].width}
              height={filters[this.state.current_filter].height}
              left={filters[this.state.current_filter].left}
              right={filters[this.state.current_filter].right}
              top={filters[this.state.current_filter].top}
              />
            
            
          })}
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.lowerTopContainer}></View>
          <View style={styles.lowerBottomContainer}>
            <ScrollView
              contentContainerStyle={styles.categories}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Object.keys(data).map(category => {
                return (
                  <TouchableOpacity
                    key={`category-button-${category}`}
                    style={[
                      styles.category,
                      {
                        backgroundColor:
                          this.state.selected === category
                            ? "#FFA384"
                            : "#FFFF"
                      }
                    ]}
                    onPress={() =>
                      this.setState({
                        selected:category,
                        current_filter: data[category][0].id
                      })
                    }
                  >
                    <Image
                      source={filter_data.src}
                      style={styles.filterImage}
                    />

                    <Text>{category}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F2F8"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  upperContainer: {
    flex: 0.13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7F2F8",
    flexDirection: "row"
  },
  appIcon: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    borderWidth: 2,
    borderColor: "#FFA384",
    marginRight: RFValue(10)
  },
  appName: {
    color: "#FFA384",
    fontSize: RFValue(25),
    fontWeight: "800",
    fontStyle: "italic"
  },
  middleContainer: { flex: 0.67 },
  lowerContainer: {
    flex: 0.2,
    backgroundColor: "#E7F2F8"
  },
  lowerTopContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  lowerBottomContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFE7BC"
  },
  filters: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  filterButton: {
    height: RFValue(70),
    width: RFValue(70),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(35),
    backgroundColor: "#E7F2F8",
    borderWidth: 5,
    marginRight: RFValue(20),
    marginBottom: RFValue(10)
  },
  filterImage: {
    height: "60%",
    width: "60%",
    alignSelf: "center",
    resizeMode: "contain"
  }
});

const filters={
  "crown-pic1":{
    src:require("../assets/crown-pic1.png"),
    width: 3.5,
    height: 0.7,
    left:0.46,
    right: 0.15,
    top:1.5
  },
  "crown-pic2":{
    src:require("../assets/crown-pic2.png"),
    width: 3.5,
    height: 1.2,
    left:0.46,
    right: 0.15,
    top:0.7
  },
  "crown-pic1":{
    src:require("../assets/crown-pic3.png"),
    width: 2,
    height: 0.6,
    left:0.36,
    right: 0.15,
    top:1.5
  },
}
