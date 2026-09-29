import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import { useNeedsActionCreators, useNeedsSelectors } from '../needs.slice';
import type { TNeed } from '../types';

type TForm = {
  needs: TNeed[];
};

export const NeedFormEdit = () => {
  const { needs } = useNeedsSelectors();
  const needsActions = useNeedsActionCreators();
  const stepperActions = useStepperActionCreators();
  const [form] = Form.useForm<TForm>();
  const needsValue: TNeed[] = Form.useWatch('needs', form) || [];

  const isAddNeedDisabled =
    needsValue.every(({ name }) => !!name?.trim()) && needsValue.length < 2;

  useEffect(() => {
    form.setFieldsValue({
      needs: needs.map((need) => ({
        id: need.id,
        name: need.name,
      })),
    });
  }, [needs, form]);

  const onFinish = (values: TForm) => {
    needsActions.createMany(values.needs);
    stepperActions.setStep({
      current: 0,
      percent: 50,
    });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.List name="needs">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field) => {
              return (
                <Form.Item key={field.key}>
                  <Form.Item name={[field.name, 'id']} noStyle>
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    rules={[
                      { required: true, message: 'Введіть потребу' },
                      {
                        validator(_, value) {
                          if (value?.trim().length >= 3) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error('Мінімум 3 символи'));
                        },
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
                onClick={() => add({ id: uuidv4(), name: '' })}
                icon={<PlusOutlined />}>
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
        )}
      </Form.List>
    </Form>
  );
};
