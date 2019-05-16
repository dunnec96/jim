import React from 'react';
import * as typeformEmbed from '@typeform/embed'
import { View, WebView } from 'react-native'

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.el = null;
    }
    componentDidMount() {
        if (this.el) {
            typeformEmbed.makeWidget(this.el, "https://christopherdunne.typeform.com/to/hZ9G5i", {
                hideFooter: true,
                hideHeaders: true,
                opacity: 0
            });
        }
    }
    render() {
        return (
            <View style={{
                flex: 1,
                borderWidth: 1,
                width: '100%'
            }}>
                <WebView
                    source={{ uri: 'https://christopherdunne.typeform.com/to/hZ9G5i' }}
                    style={{ marginTop: 20 }}
                    style={{ borderWidth: 1, height: 500 }}
                />
            </View>
            // <View ref={(el) => this.el = el} style={{ width: 300, height: 300 }} />
        )
    }
}

export default Form;