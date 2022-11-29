import BuildingDashboardTable from "./BuildingDashboardTable";
export default function BuildingDashboard(props) {
  return (
    <div>
      <BuildingDashboardTable buildings={props.buildings} />
    </div>
  );
}
