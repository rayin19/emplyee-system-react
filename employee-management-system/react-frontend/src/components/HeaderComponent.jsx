import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg bg-primary">
                        <div>
                            <a className="navbar-brand text-light" href="/">Employee Management App</a>
                        </div>
                    </nav>
                    <br/>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;