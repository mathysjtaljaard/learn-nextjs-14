// import { getDbClient } from "../connectors/prisma-mongodb-connector";
// import { User } from "../definitions";
// const userClient = getDbClient().user;

// export async function getUsers(id?: string) {
//   if (id) {
//     return await userClient.findFirstOrThrow({
//       where: {
//         id,
//       },
//     });
//   }
//   return await userClient.findMany();
// }

// export async function createUser(user: User) {
//   return userClient.create({
//     data: user,
//   });
// }

// async function testUserClient() {
//   let result = await getUsers();
//   console.dir(result);
//   result = await createUser({
//     name: "User",
//     email: "user@nextmail.com",
//     password: "123456",
//   });
//   console.dir(result);
// }

// testUserClient();
