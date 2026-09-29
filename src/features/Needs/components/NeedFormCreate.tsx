import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import { useNeedsActionCreators } from '../needs.slice';

type TForm = {
  needs: string[];
};

export const NeedFormCreate = () => {
  const needsActions = useNeedsActionCreators();
  const stepperActions = useStepperActionCreators();
  const [form] = Form.useForm();
  const needsValue: string[] | undefined = Form.useWatch('needs', form)?.filter(
    Boolean
  );

  const isAddNeedDisabled = needsValue?.length < 2;

  const onFinish = async (values: TForm) => {
    needsActions.createMany(
      values.needs.map((name) => {
        const id = uuidv4();
        return { id, name };
      })
    );
    stepperActions.setStep({
      current: 0,
      percent: 50,
    });
  };

  return (
    <Form name="needs" onFinish={onFinish} form={form}>
      <Form.List name="needs">
        {(fields, { add, remove }, { errors }) => {
          return (
            <>
              {fields.map((field) => {
                const { key, ...rest } = field;
                return (
                  <Form.Item required={false} key={key}>
                    <Form.Item
                      {...rest}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        () => ({
                          validator(_, value) {
                            if (value?.trim().length >= 3) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('Мінімум 3 символи')
                            );
                          },
                        }),
                        {
                          required: true,
                          message: 'Введіть потребу',
                        },
                      ]}
                      noStyle>
                      <Input placeholder="ОКП" style={{ width: '85%' }} />
                    </Form.Item>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                      style={{ marginLeft: 10, width: '7%' }}
                    />
                  </Form.Item>
                );
              })}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  disabled={fields.length > needsValue?.length}>
                  Додати
                </Button>
                {fields.length >= 1 ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!!errors.length || isAddNeedDisabled}>
                    Зберегти
                  </Button>
                ) : null}
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form>
  );
};
