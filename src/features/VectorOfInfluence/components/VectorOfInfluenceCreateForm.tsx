import { Button, Card, Flex, Form, InputNumber, Listy, Typography } from 'antd';
import { useEffect, type FC } from 'react';
import { useAbilitiesSelectors } from '../../Abilities/abilities.slice';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import {
  useVectorOfInfluenceActionCreators,
  useVectorOfInfluenceSelectors,
} from '../vectorOfInfluence.slice';

interface Item {
  id: string;
  name: string;
}

type TForm = Record<string, number>;

export const VectorOfInfluenceCreateForm: FC<{
  min: number;
  max: number;
}> = ({ min, max }) => {
  const { abilities } = useAbilitiesSelectors();
  const { vectorsOfInfluences } = useVectorOfInfluenceSelectors();
  const vectorOfInfluenceActions = useVectorOfInfluenceActionCreators();
  const stepperActions = useStepperActionCreators();
  const [form] = Form.useForm<TForm>();

  useEffect(() => {
    form.setFieldsValue(vectorsOfInfluences);
  }, [vectorsOfInfluences]);

  const values = Form.useWatch([], form) ?? {};

  const sum = Object.values(values).reduce((acc, curr) => acc + (curr ?? 0), 0);

  const roundedSum = +sum.toFixed(3);

  const isSumOk = roundedSum === 1;

  return (
    <Card title={`(${roundedSum.toFixed(3)}) Перелік критичних спроможностей`}>
      <Form<TForm>
        form={form}
        onFinish={(values: TForm) => {
          vectorOfInfluenceActions.create(values);
          stepperActions.setStep({
            current: 3,
            percent: 100,
          });
        }}>
        <Listy<Item>
          items={abilities}
          rowKey="id"
          itemRender={(item) => (
            <Flex gap="medium" align="center">
              <Form.Item name={item.id} noStyle initialValue={min}>
                <InputNumber mode="spinner" min={min} max={max} step={0.001} />
              </Form.Item>

              <Typography.Text disabled>
                ({min} - {max})
              </Typography.Text>

              <Typography.Text>{item.name}</Typography.Text>
            </Flex>
          )}
        />

        <Button type="primary" htmlType="submit" disabled={!isSumOk}>
          Зберегти!
        </Button>

        <br />

        {!isSumOk && (
          <Typography.Text type="danger">
            Сума всіх вектор-рядків повинна дорівнювати 1
          </Typography.Text>
        )}
      </Form>
    </Card>
  );
};
