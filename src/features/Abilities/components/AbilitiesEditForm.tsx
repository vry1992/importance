import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import {
  useAbilitiesActionCreators,
  useAbilitiesSelectors,
} from '../abilities.slice';

type TForm = {
  abilities: string[];
};

export const AbilitiesEditForm = () => {
  const abilitiesActions = useAbilitiesActionCreators();
  const stepperActions = useStepperActionCreators();
  const { abilities } = useAbilitiesSelectors();
  const [form] = Form.useForm();
  const values: string[] | undefined = Form.useWatch('abilities', form)?.filter(
    Boolean
  );

  const isAddNeedDisabled = !values?.length;

  const onFinish = (values: TForm) => {
    abilitiesActions.createMany(
      values.abilities.map((name) => {
        const id = uuidv4();
        return { id, name };
      })
    );
    stepperActions.setStep({
      current: 1,
      percent: 50,
    });
  };

  useEffect(() => {
    if (abilities) {
      console.log(abilities);
    }
  }, [abilities]);

  return (
    <Form name="abilities" onFinish={onFinish} form={form}>
      <Form.List name="abilities">
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
                          message: 'Введіть спроможність',
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
                  disabled={fields.length > values?.length}>
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
