import axios from 'axios';
class UserService {
  public static async GetMostPopularRepo() {
    const results: any[] | PromiseLike<any[]> = [];
    await axios
      .get(
        'https://api.github.com/users/PanduruIonut/repos?q=created:">2018-09-30"language:python&sort=stars&order=desc&per_page=10',
        {}
      )
      .then(response => {
        response.data.map((item: any) => {
          console.log(item.name);
          results.push(item.name);
        });
        return results;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
export default UserService;
