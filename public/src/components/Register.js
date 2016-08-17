'use strict';

const Register = React.createClass({

    getInitialState: function () {

        return {
            myState: false
        }
    },

    target: function () {
        const username = $("input[name=username]").val();
        const password = $("input[name=password]").val();
        const surepassword = $("input[name=password-sure]").val();
        if (username === '') {
            alert("用户名不能为空，请输入用户名");
        }
        else if (password === '') {
            alert("密码不能为空，请输入密码")
        }
        else if (surepassword === '') {
            alert("确认密码不能为空，请输入密码")
        } else {
            $.post('/selectUser', {"name": username}, (data)=> {
                if (data.length === 0) {
                    if (surepassword !== password) {
                        alert("两次输入密码不相同，请重新输入");
                        $("input[name=password]").val('');
                        $("input[name=password-sure]").val('');
                        $("input[name=password]").focus();

                    } else {
                        $.post('/insertUser', {name: username, password}, (data)=> {
                        });
                        this.setState({myState: true});

                        $("input[name=username]").val('');
                        $("input[name=password]").val('');
                        $("input[name=password-sure]").val('');
                    }

                } else {
                    alert('该用户已存在，请重新输入');
                    $("input[name=username]").val('');
                    $("input[name=password]").val('');
                    $("input[name=password-sure]").val('');
                    $("input[name=username]").focus();

                }
            });
        }
    },

    render: function () {
        return <div>
            <Header/>
            <Image/>
            <RegisterArea target={this.target} myState={this.state.myState}/>
        </div>
    }
});

const Header = React.createClass({
    render: function () {
        return <div className="row my-nav my-bg my-white-color">
            <ul className="nav">
                <ReactRouter.Link to="/home">
                    <li className="col-xs-4"><span className="glyphicon glyphicon-circle-arrow-left">返回</span></li>
                </ReactRouter.Link>
                <li className="col-xs-4 text-center">注册</li>
            </ul>
        </div>
    }
});

const Image = React.createClass({
    render: function () {
        return <div className="image">
            <img src="src/img/register.jpg"/>
        </div>
    }
});

const RegisterArea = React.createClass({
    render: function () {

        return <div id="form-4" className="design">
            <form>
                <p className="col-xs-offset-1 col-xs-10">
                    <input type="text" name="username" placeholder="用户名" autoFocus="true"/>
                </p>
                <p className="col-xs-offset-1 col-xs-10">
                    <input type="password" name='password' placeholder="密码"/>
                </p>
                <p className="col-xs-offset-1 col-xs-10">
                    <input type="password" name='password-sure' placeholder="确认密码" onBlur={this.props.target}/>
                </p>
            </form>
            <p className="text-center">
                <ReactRouter.Link to={this.props.myState ? "/login" : "/register"}>register
                </ReactRouter.Link>
            </p>
        </div>
    }
});

export default Register;