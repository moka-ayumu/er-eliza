import { GetServerSideProps, NextPage } from "next";
import styles from "./Equipment.module.scss";
import Image from "next/image";

const Equipment: NextPage<{
  equipment: IEquipment;
  width: number;
  height: number;
}> = ({ equipment, width, height }) => {
  return (
    <div className={styles.equipment}>
      {["0", "1", "2", "3", "4", "5"].map((pos) => {
        const equip: any = equipment;
        return (
          <div>
            {equip.hasOwnProperty(pos) ? (
              <Image
                src={`/asset/Items/${equip[pos].toString().slice(0, 3)}/${equip[
                  pos
                ]
                  .toString()
                  .slice(-3)}.png`}
                width={width}
                height={height}
                objectFit="scale-down"
              />
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Equipment;
