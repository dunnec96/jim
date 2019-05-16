// export default Points;
//This is an example code to generate QR code//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, TextInput, TouchableOpacity, Text, } from 'react-native';
// import all basic components
import QRCode from 'react-native-qrcode';
//import QRCode
import firebase from 'firebase'
import { ScrollView } from 'react-native-gesture-handler';


class App extends Component {
  constructor() {
    super();
    this.state = {
      // Default Value of the TextInput
      // Default value for the QR Code
    };
  }

  componentWillMount() {
    const user = firebase.auth().currentUser

    if (user) {
      const userUid = user.uid
      var arr = []
      var outputArray = [];
      var total = 0
      firebase.database().ref('/points/' + userUid).on('value', (snapshot) => {
        var index = snapshot.numChildren()
        for (var key in snapshot.val()) {
          total += snapshot.val()[key].points
          arr.push(snapshot.val()[key])
        }

        if (arr.length === index) {

          arr.forEach(function (e) {
            if (!this[e.task]) {
              this[e.task] = { task: e.task, points: 0, userUid: e.userUid }
              outputArray.push(this[e.task]);
            }
            this[e.task].points += Number(e.points);
          }, {});

          this.setState({ points: outputArray, total })

        }

      })

    }
  }

  points(items) {
    return (
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: '10%',
        paddingVertical: 5,
      }}>
        <View style={{ flexGrow: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {items.task}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>
            {items.points}
          </Text>
        </View>
      </View>
    )
  }

  getTextInputValue = () => {
    const { total } = this.state
    // Function to get the value from input
    // and Setting the value to the QRCode
    this.setState({ valueForQRCode: total });
  };
  render() {
    const { total, points, valueForQRCode } = this.state
    return (
      <View style={styles.MainContainer}>
        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 20 }}>
          <View style={{}}>
            <Text style={{ color: 'grey', fontSize: 24 }}>
              {'My Points'}
            </Text>
          </View>
        </View>
        {
          valueForQRCode &&
          <View style={{ paddingVertical: 20, alignItems: 'center' }}>
            <QRCode
              value={this.state.valueForQRCode}
              //Setting the value of QRCode
              size={250}
              //Size of QRCode
              bgColor="#000"
              //Backgroun Color of QRCode
              fgColor="#fff"
            //Front Color of QRCode
            />
          </View>

        }
        <ScrollView style={{ width: '100%', paddingVertical: 10 }}>
          {
            points &&
              points.length ?
              points.map((items) => {
                return (
                  this.points(items)
                )
              })
              :
              null
          }
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: '10%',
            paddingVertical: 5,
          }}>
            <View style={{ flexGrow: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>
                {'Total Points'}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>
                {total && total}
              </Text>
            </View>
          </View>
        </ScrollView>
        
        <TouchableOpacity
          onPress={this.getTextInputValue}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.TextStyle}> Generate QR Code </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  TextInputStyle: {
    width: '100%',
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: '#F44336',
    marginBottom: 20,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});