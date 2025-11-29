import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import EventsList from "../../components/events/EventsList";

function EventsPage() {
  return (
    <div>
      <PageMeta title="رویداد ها " description="رویداد ها" />
      <PageBreadcrumb pageTitle="رویداد ها" subMenu="لیست رویداد ها" />
      <EventsList />
    </div>
  );
}

export default EventsPage;
