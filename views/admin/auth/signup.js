module.exports = ({req}) => {
    return `
    <div>
        Your Id is ${req.session.userId}
        <form action="" method="POST">
            <input  type="email" name="email" id="" placeholder="email">
            <input type="password" name="password" id="" placeholder="password">
            <input type="password" name="passwordConfirmation" id="" placeholder="Confirm password">
            <button>Register</button>
        </form>
    </div>
    
    `;

}