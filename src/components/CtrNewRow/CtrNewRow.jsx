import { Form, Button, Space, Input, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const CtrNewRow = ({ ctrModels, ...otherProp }) => {
  return (
    <Form.List name='ctrs' {...otherProp}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                marginLeft: 270,
                display: "flex",
                marginBottom: 0,
              }}
              align='baseline'
            >
              <Form.Item
                {...restField}
                name={[name, "model_id"]}
                rules={[
                  {
                    required: true,
                    message: "Missing cartridge model name",
                  },
                ]}
              >
                <Select
                  placeholder='select cartridge model ...'
                  style={{ minWidth: 400, textAlign: "left" }}
                >
                  {ctrModels.map((model) => (
                    <Select.Option key={model.id} value={model.id}>
                      {model.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "serial_number"]}
                rules={[
                  {
                    required: true,
                    message: "Missing serial number",
                  },
                ]}
              >
                <Input placeholder='Serial number' />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button
              type='dashed'
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
              style={{ marginLeft: 270 }}
            >
              Add cartridge
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default CtrNewRow;
