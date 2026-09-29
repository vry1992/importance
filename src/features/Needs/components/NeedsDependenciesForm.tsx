import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Radio,
  Row,
  Space,
  Typography,
  type CheckboxOptionType,
} from 'antd';
import React from 'react';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import { useNeedsActionCreators, useNeedsSelectors } from '../needs.slice';
import type {
  TConnectivityMatrix,
  TConnectivityMatrixRow,
  TNeed,
} from '../types';
import { buildNeedsDependencies } from '../utils';

const NEEDS_DEPENDENCY_CONFIG: CheckboxOptionType<any>[] = [
  { value: 0, label: 'Відсутній' },
  { value: 0.2, label: 'Слабкий' },
  { value: 0.3, label: 'Середній' },
  { value: 0.5, label: 'Сильний' },
  { value: 1, label: '', style: { visibility: 'hidden' } },
];
type TForm = Record<string, Record<string, number>>;

export const NeedsDependenciesForm: React.FC = () => {
  const { needs } = useNeedsSelectors();
  const sliderConfig = buildNeedsDependencies(needs);
  const stepperActions = useStepperActionCreators();
  const needsActions = useNeedsActionCreators();
  const [form] = Form.useForm<TForm>();

  const needsAsObj = needs.reduce<Record<string, TNeed>>((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  const onFinish = (values: TForm) => {
    console.log('values => ', values);
    const normalizedValues: TConnectivityMatrix = Object.entries(values).reduce(
      (valuesAcc, [needId, needDependencies]) => {
        const dependencies = Object.entries(needDependencies).reduce(
          (depsAcc, [dependencyId, value]): TConnectivityMatrixRow => {
            depsAcc.push({
              value,
              need: needsAsObj[needId],
              dependency: needsAsObj[dependencyId],
              rowId: needId,
              colId: dependencyId,
            });

            return depsAcc;
          },
          []
        );

        valuesAcc[needId] = dependencies;
        return valuesAcc;
      },
      {}
    );

    console.log('normalized => ', normalizedValues);

    needsActions.createConnectivityMatrix(normalizedValues);

    stepperActions.setStep({
      current: 0,
      percent: 90,
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={[8, 8]} justify={'start'}>
          {sliderConfig.map(({ main, deps }) => {
            return (
              <Col xs={24} sm={24} md={12} key={main.id}>
                <Card
                  key={main.id}
                  title={`Взаємозалежності із потребою: "${main.name}"`}
                  style={{
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}>
                  {deps.map((dep) => {
                    return (
                      <Flex
                        align="center"
                        style={{
                          marginBottom: '10px',
                          display: dep.id !== main.id ? 'flex' : 'none',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                        }}
                        key={`${main.id}_${dep.id}`}>
                        <Form.Item
                          name={[main.id, dep.id]}
                          style={{
                            marginBottom: 0,
                          }}
                          initialValue={dep.id === main.id ? 1 : 0}>
                          <Radio.Group
                            options={NEEDS_DEPENDENCY_CONFIG}></Radio.Group>
                        </Form.Item>
                        <Typography.Text
                          style={{
                            marginRight: '20px',
                            borderLeftWidth: 1,
                            borderLeftColor: 'black',
                            borderLeftStyle: 'solid',
                            paddingLeft: 10,
                          }}>
                          {dep.name}
                        </Typography.Text>
                      </Flex>
                    );
                  })}
                </Card>
              </Col>
            );
          })}
        </Row>

        <Form.Item style={{ textAlign: 'center', marginTop: 16 }}>
          <Button type="primary" htmlType="submit" size="large">
            Зберегти
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
