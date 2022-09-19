/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react'
import { View ,TextInput, Button,Text} from 'react-native';
import { DataTable } from 'react-native-paper';



class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name:"",
        city:"",
        age:null
      }, 
      users : [],
      pos:-1
    };
    
  }
  
  handleChange =(key,value)=>{
    // const {key, value} = e.target;
    let user = {...this.state.user};
    user[key] = value;

    this.setState({
      user
    });

    //OR

    // this.setState({
    //   ...this.state, 
    //   user : {
    //     ...this.state.user,
    //     [e.target.name]:e.target.value
    //   }
    // });
  }

  clearForm = () => {
    this.setState({
      user: {
        name:"",
        city:"",
        age:null
      }
    });
  }

  handleSave = (index, remove) =>{
    let users = [...this.state.users];
    this.clearForm();

    if(remove)
      users.splice(index, 1);
    else if(index==-1)
      users.push(this.state.user);
    else if(index>-1)
      users[index] = this.state.user;

    console.log("users", users);
    this.setState({
      users,
      pos : -1,
    });
  }

  handleQuickEdit = (index) => {
    let users = [...this.state.users];
    this.setState({
      user : users[index],
      pos : index
    });
  }


  render(){
    return(
      <View>
          <View style={{}}>
            <Text style={{textAlign:'center',paddingBottom:20,paddingTop:20}}>FORM </Text>
            <TextInput style={{width: 350, height: 50,borderWidth:1,marginLeft:25,marginBottom:20}} type="text" placeholder='Name' name="name"  onChangeText={(text)=>{this.handleChange("name",text)}} required/>
            <TextInput style={{width: 350, height: 50,borderWidth:1,marginLeft:25,marginBottom:20}}  type="text" name="city" placeholder='City'  onChangeText={(text)=>{this.handleChange("city",text)}} required />
            <TextInput style={{width: 350, height: 50,borderWidth:1,marginLeft:25,marginBottom:20}}  type="text" name="age" placeholder='Age'  onChangeText={(text)=>{this.handleChange("age",text)}} required/>
            <Button style={{width: "90%"}}  title='Submit' onPress={(pos)=>{this.handleSave(this.state.pos)}}/>    
          </View>

          <DataTable>
            <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>City</DataTable.Title>
                <DataTable.Title>Age</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            <View>
            {this.state.users.length 
              ?
                this.state.users.map((ele, index)=>{
                  return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>{ele.name}</DataTable.Cell>
                        <DataTable.Cell>{ele.city}</DataTable.Cell>
                        <DataTable.Cell>{ele.age}</DataTable.Cell>
                        <DataTable.Cell>
                          <View>
                           
                              <Button title='Edit' onClick={()=>{this.handleQuickEdit(index)}}/>
                              <Button title='Delete' onClick={()=>{this.handleSave(index, true);}}/>
                          </View>
                        </DataTable.Cell>
                      </DataTable.Row>
                  )
                })
              :
                <DataTable.Row><Text>No data exists</Text></DataTable.Row>
            }
            </View>
          </DataTable>
      </View>
    )
  }
}

export default Form;