import AppAutoComplete from './Common/AppAutoComplete';

export default function GuideSearchBar() {
  return (
    <section className="container">
      <div className="booking_area">
        <form>
          <div className="row py-5">
            <div className="col col-md-10 mx-auto">
              <div className="row">
                <div className="col col-md-10 col-8">
                  <AppAutoComplete
                    items={[]}
                    label="Trouver un guide :"
                    isOpen={Boolean(1)}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
