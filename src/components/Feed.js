import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Toolbar from './Toolbar'
import avatar from "../../assets/avatar.png";
import firebase from 'firebase'


export default class itemlister extends Component {
    constructor() {
        super();
        // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            // itemDataSource: ds
            card: []
        }
        // this.renderRow = this.renderRow.bind(this);
        // this.pressRow = this.renderRow.bind(this);

    }
    componentWillMount() {
        // this.getItems();
        var arr = []
        firebase.database().ref('/events/').limitToFirst(20).on('child_added', (snapshot) => {
            console.log(snapshot.val(), 'snapdhso here')
            arr.push(snapshot.val())
            this.setState({ card: arr })
        })
    }
    componentDidMount() {
        // this.getItems();
    }
    // getItems(){
    //     let items = [{title:'item one'}];

    //     this.setState({
    //         itemDataSource: this.state.itemDataSource.cloneWithRows(items)
    //     });
    // }
    // pressRow(item){
    //     console.log(item);

    // }
    // renderRow(item){
    //     return(
    //         <TouchableHighlight onPress={() => {
    //             this.pressRow(item);
    //         }}>
    //         <View style={styles.liText}>
    //         <Text style={styles.liText}>{item.title}</Text>
    //         </View>

    //         </TouchableHighlight>
    //     )
    // }


    myCard(items) {
        return (
            <TouchableOpacity activeOpacity={0.8} style={{ width: '100%' }}>
                <View style={styles.cards}>
                    <View style={styles.image}>
                        <View style={{ width: 60, height: 60 }}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={items.image ? { uri: items.image } : avatar}
                            />
                        </View>
                    </View>
                    <View style={styles.description}>
                        <View style={styles.top}>
                            <View style={{ paddingHorizontal: 4, width: '60%' }}>
                                <Text style={{ fontSize: 14, color: '#a52d27' }}>
                                    {items.event}
                                </Text>
                            </View>
                            <View style={{ paddingTop: 5, width: '40%', paddingHorizontal: 2, alignItems: 'center' }}>
                                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#cdcdcd' }}>
                                    {`${items.day} ${items.date} ${items.month}`}
                                </Text>
                            </View>
                        </View>
                        <View style={{ borderWidth: 1, marginVertical: 1, borderColor: '#505050' }} />
                        <View style={styles.text}>
                            <Text style={{ fontSize: 12, color: '#b7b7b7' }}>
                                {items.content}
                            </Text>
                        </View>
                        <View style={styles.footer}>
                            {/* <View style={{ width: '50%', paddingHorizontal: 2, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 11, color: 'white' }}>
                                    {'Doors:'}
                                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>
                                        {'10:30px '}
                                    </Text>
                                    {'in'}
                                </Text>
                                <View style={{ flexWrap: 'wrap', flex: 1 }}>
                                    <Text style={{ fontSize: 11, textAlign: 'center', fontWeight: 'bold', color: '#f3ce4f' }}>
                                        {' Wheelans Bar'}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '50%', paddingHorizontal: 2, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 11, color: 'white' }}>
                                    {'Tickets: '}
                                </Text>
                                <View style={{ flexWrap: 'wrap', flex: 1 }}>
                                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#f3ce4f' }}>
                                        {'No Cover Charges'}
                                    </Text>
                                </View>
                            </View> */}
                            <View style={{ paddingHorizontal: 3, width: '100%' }}>
                                <Text style={{ fontSize: 11, color: 'white', textAlign: 'right' }}>
                                    {items.info}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { card } = this.state
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: '100%' }}>
                    {
                        card && card.length ?
                            card.map((items) => {
                                return (
                                    this.myCard(items)
                                )
                            })
                            :
                            null
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // borderWidth: 1
    },
    footer: {
        // borderWidth: 1,
        marginVertical: 5,
        flexDirection: 'row',
        backgroundColor: 'grey',
        paddingVertical: 3
    },
    text: {
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    cards: {
        width: '100%',
        borderTopWidth: 3,
        paddingVertical: 3,
        borderTopColor: '#3f3f3f',
        // height: 200,
        backgroundColor: '#000000',
        flexDirection: 'row'
    },
    image: {
        width: '20%',
        // borderWidth: 1,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    description: {
        width: '80%',
        // borderWidth: 1,
        flexGrow: 1,
        paddingHorizontal: 5,
    },
    top: {
        // borderWidth: 1,
        flexDirection: 'row',
    }
});



// import React, { Component } from 'react';
// import { View, Text, StyleSheet} from 'react-native';
// import ItemComponent from '../components/ItemComponent';

// import { db } from '../config/john';

// let itemsRef = db.ref('/items');

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       backgroundColor: '#ffffff' 
//     }
//   })

// export default class List extends Component {

//     state = {
//         items: []
//     }

//     componentDidMount() {
//         itemsRef.on('value', (snapshot) => {
//             let data = snapshot.val();
//             let items = Object.values(data);
//             this.setState({items});
//          });
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 {
//                     this.state.items.length > 0
//                     ? <ItemComponent items={this.state.items} />
//                     : <Text>No items</Text>
//                 }
//             </View>
//         )
//     }
// }
// import React, { Component } from 'react';  
// import { View, Text, StyleSheet } from 'react-native';  
// import ItemComponent from '../components/ItemComponent';

// import { db } from '../config/john';

// let eventsRef = db.ref('/events');

// export default class List extends Component {  
//   state = {
//     events: []
//   };

//   componentDidMount() {
//     eventsRef.on('value', snapshot => {
//       let data = snapshot.val();
//       let events = Object.values(data);
//       this.setState({ events });
//     });
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.events.length > 0 ? (
//           <ItemComponent events={this.state.events} />
//         ) : (
//           <Text>Fuck you tully</Text>
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({  
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ebebeb'
//   }
// });
// import React, { Component } from 'react';
// import { List, ListItem } from 'react-native-elements';
// import { View, Text,} from 'react-native';

// export default class Feed extends Component{
//     render(){
//         return (
//             <List containerStyle={{marginTop: 55}}>
//                 <ListItem
//                 title ={'Dummy'}
//                 leftIcon={{name: 'lightbulb-outline'}}
//                 />
//                  <ListItem
//                 title ={'Dummy'}
//                 leftIcon={{name: 'lightbulb-outline'}}
//                 />
//                 <ListItem
//                 title ={'Dummy'}
//                 leftIcon={{name: 'lightbulb-outline'}}
//                 />
//             </List>
//         )
//     }

// }
