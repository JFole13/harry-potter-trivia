import React from "react";

class MyComponent extends React.Component {
    componentDidMount() {
        // Called after the component is mounted to the DOM
        console.log('Component mounted');
    }

    componentWillUnmount() {
        // Called before the component is unmounted from the DOM
        console.log('Component will unmount');
    }

    render() {
        return <div>Hello, World!</div>;
    }
}

export default MyComponent;

