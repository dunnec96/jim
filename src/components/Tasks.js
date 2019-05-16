import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
import firebase from 'firebase'
import TypeForm from './typeForm'


export default class ButtonFullExample extends Component {
  constructor() {
    super()

    this.state = {
      disabled: false
    }
  }

  onClickAction(task) {
    const user = firebase.auth().currentUser

    if (user) {
      const userUid = user.uid
      var obj = {
        task,
        points: 5,
        userUid
      }
      this.setState({ disabled: true })
      firebase.database().ref('/points/' + userUid).push(obj).then(() => {
        this.setState({ disabled: false })

      })

    }
  }


  render() {
    const { disabled } = this.state
    return (
      <Container>
        <Header />
        <Content>
          {/* <Button disabled={disabled} onPress={() => this.onClickAction('Task 1')} full light>
            <Text>Task 1</Text>
          </Button>
          <Button disabled={disabled} onPress={() => this.onClickAction('Task 2')} full>
            <Text>Task 2</Text>
          </Button>
          <Button disabled={disabled} onPress={() => this.onClickAction('Task 3')} full success>
            <Text>Task 3</Text>
          </Button>
          <Button disabled={disabled} onPress={() => this.onClickAction('Task 4')} full info>
            <Text>Task 4</Text>
          </Button>
          <Button disabled={disabled} onPress={() => this.onClickAction('Task 5')} full warning>
            <Text>Task 5</Text>
          </Button>
          <Button disabled={disabled} onPress={() => this.onClickAction('Task 6')} full danger>
            <Text>Task 6</Text>
          </Button>
          <Button disabled={disabled} onPress={() => this.onClickAction('Task 7')} full dark>
            <Text>Task 7</Text>
          </Button> */}

          <TypeForm />

        </Content>
      </Container>
    );
  }
}
// import React from 'react';
// import * as typeformEmbed from '@typeform/embed'

// class Form extends React.Component {
//   constructor(props) {
//     super(props);
//     this.el = null;
//   }
//   componentDidMount() {
//     if (this.el) {
//       typeformEmbed.makeWidget(this.el, "", {
//         hideFooter: true,
//         hideHeaders: true,
//         opacity: 0
//       });
//     }
//   }
//   render() {
//     return (
//       <div ref={(el) => this.el = el} style={{width: '100%', height: '300px'}} />
//     )
//   }
// }

// export default Form;