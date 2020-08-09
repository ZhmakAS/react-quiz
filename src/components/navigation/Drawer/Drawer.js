import React, {Component} from "react";
import classes from './Drawer.module.css'
import NavLink from "react-router-dom/NavLink";


class Drawer extends Component {

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink to={link.to} exact={link.exact} activeClassName={classes.active}> {link.label}</NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = [
            {to: '/', label: 'List', exact: true},
        ]

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Create Test', exact: false})
            links.push({to: '/logout', label: 'Logout', exact: false})
        } else {
            links.push({to: '/auth', label: 'Authorization', exact: false})
        }


        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
            </React.Fragment>

        )
    }
}

export default Drawer
