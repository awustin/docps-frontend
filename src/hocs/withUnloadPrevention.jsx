import React from 'react';

export default function withUnloadPrevention(Component) {
    return class MyComponent extends React.Component {
        onUnload(event) {
            event.preventDefault();
            event.returnValue = "";
            return "";
        }

        componentDidMount() {
            window.addEventListener("beforeunload", this.onUnload);
        }

        render() {
            return (
                <>
                    <Component />
                </>
            )
        }
    }
}