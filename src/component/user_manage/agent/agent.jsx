import React from 'react';
import { render } from 'react-dom';
import { Form, Input, Row, Col, Button,DatePicker,Radio,Cascader,Select,Table } from 'antd';
import reqwest from 'reqwest';
import './agent.less';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const options = [
	{
	  value: 'unlimit',
	  label: '不限',
	}, 
	{
	  value: 'Salers',
	  label: '销售人员',
	  children: [
		  {
		    value: 'saler1',
		    label: '毛驴一号'
		  },
		  {
		    value: 'saler2',
		    label: '毛驴二号'
		  },
		  {
		    value: 'saler3',
		    label: '毛驴三号'
		  }
	  	],
	},
	{
	  value: 'channels',
	  label: '渠道人员',
	  children: [
		  {
		    value: 'saler1',
		    label: '羊驼一号'
		  },
		  {
		    value: 'saler2',
		    label: '羊驼二号'
		  },
		  {
		    value: 'saler3',
		    label: '羊驼三号'
		  }
	  	],
	}
	];


const columns = [
		{
		  	title: '姓名',
		  	dataIndex: 'name',
		  	filters: [
		    	{ text: '姓李的', value: '李' },
		    	{ text: '姓胡的', value: '胡' },
		   ],
		},
		{
		  	title: '年龄',
		  	dataIndex: 'age',
		  	sorter: true,
		},
		{
		    title: '住址',
		  	dataIndex: 'address',
		}
	];

const Tables = React.createClass({
  getInitialState() {
    return {
      data: [],
      pagination: {},
      loading: false,
    };
  },
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });
  },
  fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://ant.design/components/table/demo/data.json',
      method: 'get',
      data: params,
      type: 'jsonp',
      success: (result) => {
      	console.log(result);
        const pagination = this.state.pagination;
        pagination.total = result.data.length;
        this.setState({
          loading: false,
          data: result.data,
          pagination,
        });
      }
    });
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    return (
      <Table columns={columns}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange} />
    );
  }
});

const agent = React.createClass({
  getInitialState() {
    return {
      value: 1,
    };
  },
  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  },
  render() {
	return (
		<div>
			<Form horizontal className="advanced-search-form">
			  <Row>
			    <Col span="8">
			      <FormItem
			        label="注册手机号："
			        labelCol={{ span: 6 }}
			        wrapperCol={{ span: 14 }}>
			        <Input />
			      </FormItem>
			      <FormItem
			        label="注册倾向："
			        labelCol={{ span: 6 }}
			        wrapperCol={{ span: 18 }}>
			        <RadioGroup onChange={this.onChange} value={this.state.value}>
				        <Radio key="a" value={1}>不限</Radio>
				        <Radio key="b" value={2}>投广告</Radio>
				        <Radio key="c" value={3}>接广告</Radio>
				        <Radio key="d" value={null}>未确定</Radio>
				    </RadioGroup>
			      </FormItem>
			      <FormItem
			        label="推广需求："
			        labelCol={{ span: 6 }}
			        wrapperCol={{ span: 14 }}>
			        <Input placeholder="请输入关键字" />
			      </FormItem>
			    </Col>
			    <Col span="8">
			      <FormItem
			        label="注册时间："
			        labelCol={{ span: 6 }}
			        wrapperCol={{ span: 18 }}>
			        <RangePicker style={{ width: 184 }} />
			      </FormItem>
			      <FormItem
			        label="是否媒体："
			        labelCol={{ span: 6 }}
			        wrapperCol={{ span: 18 }}>
			        <RadioGroup>
				        <Radio key="a" value={4}>不限</Radio>
				        <Radio key="b" value={5}>是</Radio>
				        <Radio key="c" value={6}>否</Radio>
				        <Radio key="d" value={7}>审核中</Radio>
				    </RadioGroup>
			      </FormItem>
			      <FormItem
			        label="跟进人员："
			        labelCol={{ span: 6 }}
			        wrapperCol={{ span: 18 }}>
			        <Cascader options={options} />
			      </FormItem>
			    </Col>
			    <Col span="8">
			      <FormItem
			        label="绑定微信号："
			        labelCol={{ span: 6 }}
			        wrapperCol={{ span: 14 }}>
			        <Input placeholder="请输入微信昵称" />
			      </FormItem>
			      <FormItem
			        label="较长搜索名称："
			        labelCol={{ span: 6 }}
			        wrapperCol={{ span: 18 }}>
			        <Select defaultValue="unlimit" style={{ width: 120 }}>
				      	<Option value="unlimit">不限</Option>
				      	<Option value="agent1">代理商1</Option>
				      	<Option value="agent2">代理商2</Option>
				      	<Option value="agent3">代理商3</Option>
				      	<Option value="agent4">代理商4</Option>
				      	<Option value="agent5">代理商5</Option>
				      	<Option value="agent6">代理商6</Option>
				    </Select>
			      </FormItem>
			      <FormItem
			      	label=" "
			      	labelCol={{ span: 6 }}
			        wrapperCol={{ span: 18 }}>
			        <Button type="primary" htmlType="submit">搜索</Button>
			      </FormItem>
			    </Col>
			  </Row>
			</Form>
			<Tables />
		</div>
	)
  }
});



export default agent;