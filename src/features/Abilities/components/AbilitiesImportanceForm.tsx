import { Button, Card, Col, Flex, Form, Row, Switch, Typography } from 'antd';
import { useEffect } from 'react';
import { useNeedsSelectors } from '../../Needs/needs.slice';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import {
  useAbilitiesActionCreators,
  useAbilitiesSelectors,
} from '../abilities.slice';

type TImportanceValues = Record<string, Record<string, boolean>>;

export const AbilitiesImportanceForm: React.FC = () => {
  const { needs } = useNeedsSelectors();
  const { abilities, importance } = useAbilitiesSelectors();
  const abilitiesActions = useAbilitiesActionCreators();
  const stepperActions = useStepperActionCreators();

  const [form] = Form.useForm<TImportanceValues>();

  const onFinish = (values: TImportanceValues) => {
    const normalizedValues = Object.entries(values).reduce(
      (acc, [key, data]) => {
        const normalizedData = Object.entries(data).map(([subKey, value]) => [
          subKey,
          Number(value),
        ]);

        acc[key] = Object.fromEntries(normalizedData);

        return acc;
      },
      {}
    );
    abilitiesActions.createImportance(normalizedValues);

    stepperActions.setStep({
      current: 1,
      percent: 90,
    });
  };

  useEffect(() => {
    if (importance) {
      const normalizedValues = Object.entries(importance).reduce(
        (acc, [key, data]) => {
          const normalizedData = Object.entries(data).map(([subKey, value]) => [
            subKey,
            Boolean(value),
          ]);

          acc[key] = Object.fromEntries(normalizedData);

          return acc;
        },
        {}
      );
      form.setFieldsValue(normalizedValues);
    }
  }, [importance]);

  return (
    <Form<TImportanceValues> form={form} onFinish={onFinish}>
      <Row gutter={[8, 8]} justify="space-between">
        {abilities.map((ability) => {
          return (
            <Col xs={24} md={12} key={ability.id}>
              <Card
                title={ability.name}
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}>
                {needs.map((need) => {
                  return (
                    <Flex
                      align="center"
                      style={{ marginBottom: '10px' }}
                      key={`${ability.id}_${need.id}`}>
                      <Form.Item
                        name={[ability.id, need.id]}
                        valuePropName="checked"
                        initialValue={false}
                        noStyle>
                        <Switch
                          checkedChildren="Важлива потреба"
                          unCheckedChildren="Не важлива потреба"
                          style={{ marginRight: '20px' }}
                        />
                      </Form.Item>
                      <Typography.Text>{need.name}</Typography.Text>
                    </Flex>
                  );
                })}
              </Card>
            </Col>
          );
        })}
      </Row>

      <Form.Item
        style={{
          textAlign: 'center',
          marginTop: 16,
        }}>
        <Button type="primary" htmlType="submit" size="large">
          Зберегти
        </Button>
      </Form.Item>
    </Form>
  );
};
