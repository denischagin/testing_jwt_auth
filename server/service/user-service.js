// const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

// UserModel = [{email: "denischaginnn@gmail.com", password: "123"}]
UserModel = [{email: "denischaginnn@gmail.com", password: "123", activationLink: "hello"}]
class UserService {
    async registration(email, password) {
        // const candidate = await UserModel.findOne({email})
        const candidate = UserModel.find((user) => user.email === email)
        console.log(email, password)
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        // const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        // const user = await UserModel.create({email, password: hashPassword, activationLink})
        const user = UserModel.push({id: Date.now(),email, password, activationLink})
        console.log(`${process.env.API_URL}/api/activate/${activationLink}`)
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        // const user = await UserModel.findOne({activationLink})
        console.log("UserModel", UserModel)
        const user = UserModel.find((user) => user.activationLink === activationLink)
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        console.log(email, password)
        // const user = await UserModel.findOne({email})
        const user = UserModel.find((user) => user.email === email)
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        // const isPassEquals = await bcrypt.compare(password, user.password);
        const isPassEquals = password === user.password
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        // const user = await UserModel.findById(userData.id);
        const user = UserModel.find((user) => userData.id === user.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        // const users = await UserModel.find();
        const users = UserModel;
        return users;
    }
}

module.exports = new UserService();
